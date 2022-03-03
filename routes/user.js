const router = require('express').Router()
const bcryptjs = require('bcryptjs')

const constants = require('../config/constants')

const auth = require('../middlewares/auth')

const {
	User,
	UserRecovery,
	UserVerification,
	Cart,
	Inventory,
	Product,
	Size,
	Color,
	UserRole,
	sequelize,
} = require('../models/index')

const {
	sendRecoveryMail,
	sendVerificationMail,
} = require('../utilities/sendMail')
const createAndHashSecretString = require('../utilities/createAndHashSecretString')
const setAuthCooki = require('../utilities/setAuthCooki')

// @Update file done

// @route   GET api/user
// @desc    Get user's account detail
// @access  Private
router.get('/', auth, async (req, res) => {
	try {
		const user = await User.findByPk(req.userId, {
			attributes: { exclude: ['password'] },
		})

		// If there is no user match with cookie, delete cookie
		if (!user) {
			res.cookie('jwt', '', { maxAge: 0, httpOnly: true })
			return res.json({
				status: 'FAIL',
				message: 'Cookie không hợp lệ!',
			})
		}

		res.json({
			status: 'SUCCESS',
			message: 'Get user success!',
			payload: user,
		})
	} catch (error) {
		console.log(error)
		res.sendStatus(500)
	}
})

// @route   POST api/user
// @desc    Create a new user
// @access  Public
router.post('/', async (req, res) => {
	const transaction = await sequelize.transaction()

	try {
		const { email, password } = req.body
		let user = await User.findOne({ where: { email: email } })

		// Check if user exist
		if (user) {
			return res.json({
				status: 'FAIL',
				message: 'Tài khoản đã tồn tại!',
				user,
			})
		}

		// Create hashPassword
		const hashPassword = await bcryptjs.hash(
			password,
			constants.TIMES_GEN_SALT
		)

		// Create user, create user verification,
		// create user's roles, send verufication email
		user = await User.create(
			{
				email,
				password: hashPassword,
				verified: false,
			},
			{
				attributes: {
					exclude: ['password'],
				},
				transaction,
			}
		)

		// Create secretString and secretString hashed
		const { secretString, hashString } = createAndHashSecretString(user.id)

		console.log({ secretString, hashString })

		// Save verification user to database and Send email to user
		await Promise.all([
			UserVerification.create(
				{
					userId: user.id,
					expiredAt:
						Date.now() +
						Number.parseInt(process.env.VERIFICATION_EXPIRES_TIME),
					secret: hashString,
				},
				{ transaction }
			),
			UserRole.create(
				{
					userId: user.id,
					role: 'CLIENT',
				},
				{ transaction }
			),
		])

		await sendVerificationMail(user.id, email, secretString)
		await transaction.commit()

		res.json({
			status: 'SUCCESS',
			message: 'Đăng ký tài khoản thành công!',
			payload: user,
		})
	} catch (error) {
		await transaction.rollback()
		console.log(error)
		res.json({ status: 'FAIL', code: 500 })
	}
})

// @route   POST api/user/verification/resend
// @desc    Re send verified mail
// @access  Public
router.post('/verification/resend', async (req, res) => {
	try {
		const { email } = req.body

		const user = await User.findOne({ where: { email } })

		// If user is not exist
		if (!user) {
			return res.json({
				status: 'FAIL',
				code: 601,
				message: 'Email không tồn tại trong hệ thống!',
			})
		}

		// Delete all verified record of this user
		await UserVerification.destroy({ where: { userId: user.id } })

		// Create secret string and hashe it
		const { hashString, secretString } = createAndHashSecretString(user.id)

		// Save secret string hashed to database, send email to user
		await Promise.all([
			UserVerification.create({
				userId: user.id,
				expiredAt:
					Date.now() +
					Number.parseInt(process.env.VERIFICATION_EXPIRES_TIME),
				secret: hashString,
			}),
		])

		sendVerificationMail(user.id, email, secretString)

		res.json({
			status: 'SUCCESS',
			payload: user,
		})
	} catch (error) {
		console.log(error)
		res.sendStatus(500)
	}
})

// @route   GET api/user/verification/:userId/:secretString
// @desc    Verify user
// @access  Public
router.get('/verification/:id/:secret', async (req, res) => {
	try {
		const { id, secret } = req.params
		const user = await User.findByPk(id, {
			include: [
				{
					model: UserRole,
					required: true,
					attributes: ['role'],
				},
			],
		})

		// If user not exists, or has been verified
		//    response code 400
		if (!user || user.verify) {
			return res.json({
				status: 'FAIL',
				message: 'Tài khoản không tồn tại hoặc đã được xác minh!',
			})
		}

		// Get user verification from database
		const userVerification = await UserVerification.findOne({
			where: { userId: user.id },
		})

		// Check if verification is expired
		if (Date.now() > userVerification.expiredAt) {
			return res.json({ status: 'FAIL', message: 'Xác nhận đã hết hạn!' })
		}

		// Compare user's input secret with verification secret from database
		if (bcryptjs.compareSync(secret, userVerification.secret)) {
			// If corrects, update user's verified to true,
			//    and delete all user verification from database
			await Promise.all([
				User.update({ verified: true }, { where: { id } }),
				UserVerification.destroy({ where: { userId: id } }),
			])

			setAuthCooki({
				res,
				userId: id,
				userRoles: user.userRoles.map((item) => item.role),
			})

			return res.redirect(constants.ROOT_UI_URL)
		} else {
			// If the comparasion is not corrects
			return res.json({
				status: 'FAIL',
				message:
					'Comparison failed, unique secret is not equal with hash secret!',
			})
		}
	} catch (error) {
		console.log(error)
		res.sendStatus(500)
	}
})

// @route   POST api/user/recovery/request
// @desc    Request reset password
// @access  Public
router.post('/recovery/request', async (req, res) => {
	try {
		const { email, redirectUrl } = req.body
		const user = await User.findOne({ where: { email: email } })

		// Check user exist
		if (!user || !user.verified) {
			return res.json({
				status: 'FAIL',
				message: 'Email không tồn tại hoặc chưa được xác minh!',
			})
		}

		// If exist, delete all request reset password of this user
		await UserRecovery.destroy({ where: { userId: user.id } })

		// Create and hash secret string
		const { secretString, hashString } = createAndHashSecretString(user.id)

		// Send email for user and Create new recovery recored
		await Promise.all([
			sendRecoveryMail(user.id, email, secretString, redirectUrl),
			UserRecovery.create({
				userId: user.id,
				expiredAt:
					Date.now() + Number.parseInt(process.env.RECOVERY_EXPIRES_TIME),
				secret: hashString,
			}),
		])

		res.json({
			status: 'SUCCESS',
			message: 'Request reset password success!',
		})
	} catch (error) {
		console.log(error)
		res.sendStatus(500)
	}
})

// @route   /api/user/recovery/reset
// @desc    Recovery password
// @access  Public
router.post('/recovery/reset', async (req, res) => {
	try {
		const { userId, secretString, newPassword } = req.body

		const userRecovery = await UserRecovery.findOne({
			where: { userId },
		})

		if (!userRecovery) {
			return res.json({
				status: 'FAIL',
				message: 'Tài khoản không hợp lệ!',
			})
		}

		if (Date.now() > userRecovery.expiredAt) {
			await UserRecovery.destroy({ where: { userId } })

			return res.json({
				status: 'FAIL',
				message:
					'Link khôi phục mật khẩu của bạn đã hết hạn, vui lòng tạo lại !',
				code: 604,
			})
		}

		// Check secret strinng
		if (!bcryptjs.compareSync(secretString, userRecovery.secret)) {
			return res.json({
				status: 'FAIL',
				message:
					'Liên kết không hợp lệ, vui lòng vào liên kết của mail mới nhất!',
				code: 605,
			})
		}

		const hashPassword = bcryptjs.hashSync(
			newPassword,
			constants.TIMES_GEN_SALT
		)

		// Update password and delete all recovery records
		const [rowEffected] = await Promise.all([
			User.update(
				{ password: hashPassword },
				{
					where: { id: userId },
				}
			),
			UserRecovery.destroy({ where: { userId } }),
		])

		if (rowEffected === 0) {
			return res.json({
				status: 'FAIL',
				message: 'Server error!',
				code: 500,
			})
		}

		// Find user after update
		const user = await User.findByPk(userId, {
			include: [{ model: UserRole, require: true }],
		})

		// Create and set jwt cooki
		setAuthCooki({
			res,
			userId,
			userRoles: user.userRoles.map((item) => item.role),
		})

		res.json({
			status: 'SUCCESS',
			message: 'Recovery password success',
		})
	} catch (error) {
		console.log(error)
		res.sendStatus(500)
	}
})

module.exports = router
