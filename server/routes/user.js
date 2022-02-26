// const express = require('express')
// const router = express.Router()
const router = require('express').Router()
const User = require('../models/user')
const UserVerification = require('../models/userVerification')
const UserRecovery = require('../models/userRecovery')
const bcryptjs = require('bcryptjs')
const setAuthCooki = require('../utilities/setAuthCooki')
const { v4: uuidv4 } = require('uuid')
const { Types } = require('mongoose')
const constants = require('../config/constants')
const sendVerificationMail = require('../utilities/sendVerificationMail')
const sendMailRecoverySecretString = require('../utilities/sendMailRecoverySecretString')
const createAndHashSecretString = require('../utilities/createAndHashSecretString')

// @route   POST api/user
// @desc    Create a new user
// @access  Public
router.post('/', async (req, res) => {
	try {
		const { email, password } = req.body
		let user = await User.findOne({ email })
		const promises = []

		// Check if user exist
		if (user) {
			return res.json({
				status: 'FAIL',
				message: 'Tài khoản đã tồn tại!',
			})
		}

		// Create hashPassword and user
		const hashPassword = await bcryptjs.hash(
			password,
			constants.TIMES_GEN_SALT
		)

		user = new User({ email, password: hashPassword, verified: false })

		// Create secretString and hash it
		const secretString = uuidv4() + user._id
		const hashString = bcryptjs.hashSync(
			secretString,
			constants.TIMES_GEN_SALT
		)

		// Save user to database
		promises.push(user.save())

		// Save verification user to database
		const verificationUser = new UserVerification({
			userId: user._id,
			expiredDate:
				Date.now() + Number.parseInt(process.env.VERIFICATION_EXPIRES_TIME),
			secretString: hashString,
		})
		promises.push(verificationUser.save())

		// Send email to user
		promises.push(sendVerificationMail(user._id, email, secretString))

		// Wait for saving user, verification user, sending email
		await Promise.all(promises)

		// Response the user
		res.json({ status: 'SUCCESS', message: 'Đăng ký tài khoản thành công!' })
	} catch (error) {
		console.log(error)
		res.sendStatus(500)
	}
})

// @route   POST api/user/verification/resend
// @desc    Re send verified mail
// @access  Public
router.post('/verification/resend', async (req, res) => {
	try {
		const { email } = req.body

		const user = await User.findOne({ email })

		// If user is not exist
		if (!user) {
			return res.json({
				status: 'FAIL',
				code: '001',
				message: 'Email không tồn tại trong hệ thống!',
			})
		}

		// Delete all verified record of this user
		await UserVerification.deleteMany({ userId: user._id })

		const { hashString, secretString } = createAndHashSecretString(user._id)

		// Save secret string hashed to database
		const userVerification = new UserVerification({
			userId: user._id,
			expiredDate:
				Date.now() + Number.parseInt(process.env.VERIFICATION_EXPIRES_TIME),
			secretString: hashString,
		})

		await Promise.all([
			sendVerificationMail(user._id, email, secretString),
			userVerification.save(),
		])

		res.json({
			status: 'SUCCESS',
		})
	} catch (error) {
		console.log(error)
		res.sendStatus(500)
	}
})

// @route   GET api/user/verification/:userId/:secretString
// @desc    Verify user
// @access  Public
router.get('/verification/:id/:string', async (req, res) => {
	try {
		const { id, string } = req.params
		const user = await User.findById(id)

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
			userId: Types.ObjectId(id),
		})

		// Check if verification is expired
		if (Date.now() > userVerification.expiredDate) {
			// @TODO Do something when user verification expired
			return res.json({ status: 'FAIL', message: 'Xác nhận đã hết hạn!' })
		}

		// Compare user's input string with verification string from database
		if (bcryptjs.compareSync(string, userVerification.secretString)) {
			// If corrects, update user's verified to true,
			//    and delete all user verification from database
			await Promise.all([
				User.findOneAndUpdate({ _id: id }, { verified: true }),
				UserVerification.deleteMany({ userId: id }),
			])

			setAuthCooki(res, id)

			return res.redirect(constants.ROOT_UI_URL)
		} else {
			// If the comparasion is not corrects
			return res.json({
				status: 'FAIL',
				message:
					'Comparison failed, unique string is not equal with hash string!',
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
		const user = await User.findOne({ email })
		const promises = []

		if (!user || !user.verified) {
			return res.json({
				status: 'FAIL',
				message:
					'Email is not exist on the database or has not been verified!',
			})
		}

		// Delete all request reset password before of this user
		await UserRecovery.deleteMany({ userId: user._id })

		// Create and hash secret string
		const secretString = uuidv4() + user._id
		const hashString = bcryptjs.hashSync(
			secretString,
			constants.TIMES_GEN_SALT
		)

		// Send email for user
		promises.push(
			sendMailRecoverySecretString(
				user._id,
				email,
				secretString,
				redirectUrl
			)
		)

		// Create new recovery
		const userRecovery = new UserRecovery({
			userId: user._id,
			expiredDate:
				Date.now() + Number.parseInt(process.env.RECOVERY_EXPIRES_TIME),
			secretString: hashString,
		})
		promises.push(userRecovery.save())

		await Promise.all(promises)

		res.json({ status: 'SUCCESS', message: 'User recovery password success' })
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

		const userRecovery = await UserRecovery.findOne({ userId })

		if (!userRecovery) {
			return res.json({
				status: 'FAIL',
				message: 'User id is not match with any record of user recovery!',
			})
		}

		if (Date.now() > userRecovery.expiredDate) {
			await UserRecovery.deleteOne({ userId })
			return res.json({
				status: 'FAIL',
				message:
					'Link khôi phục mật khẩu của bạn đã hết hạn, vui lòng tạo lại !',
				code: '004',
			})
		}

		if (bcryptjs.compareSync(secretString, userRecovery.secretString)) {
			const hashPassword = bcryptjs.hashSync(
				newPassword,
				constants.TIMES_GEN_SALT
			)
			const user = await User.findOneAndUpdate(
				{ _id: Types.ObjectId(userId) },
				{ password: hashPassword },
				{ new: true, projection: { password: -1 } }
			)

			// Create and set jwt cooki
			setAuthCooki(res, userId)

			res.json({
				status: 'SUCCESS',
				message: 'Recovery password success',
				payload: user,
			})
		} else {
			res.json({
				status: 'FAIL',
				message: 'Vui lòng vào link của mail mới nhất !',
			})
		}
	} catch (error) {
		console.log(error)
		res.sendStatus(500)
	}
})

module.exports = router
