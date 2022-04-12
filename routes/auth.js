const router = require('express').Router()
const axios = require('axios')
const bcryptjs = require('bcryptjs')

const auth = require('../middlewares/auth')

const { User, UserRole, sequelize } = require('../models/index')

const setAuthCooki = require('../utilities/setAuthCooki')
const { checkIsEmail } = require('../utilities/validator')

// @route   POST api/auth/login
// @desc    Login a user
// @access  Public
router.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body

		if (!email || !checkIsEmail(email)) {
			return res.json({
				status: 'FAIL',
				code: 001,
				message: 'Email không hợp lệ!',
			})
		}

		const user = await User.findOne({
			where: { email },
			include: [
				{
					model: UserRole,
					required: true,
					attributes: ['role'],
				},
			],
		})

		if (!user) {
			return res.json({
				status: 'FAIL',
				code: 601,
				message: 'Email không tồn tại!',
			})
		}

		if (!user.password) {
			return res.json({
				status: 'FAIL',
				code: 613,
				message: 'Vui lòng đăng nhập bằng phương thức khác!',
			})
		}

		if (!bcryptjs.compareSync(password, user.password)) {
			return res.json({
				status: 'FAIL',
				code: '002',
				message: 'Mật khẩu không đúng!',
			})
		}

		if (user.verified === false) {
			return res.json({
				status: 'FAIL',
				code: 603,
				message: 'Email chưa được xác minh!',
			})
		}

		setAuthCooki({
			res,
			userId: user.id,
			userRoles: user.userRoles.map((item) => item.role),
		})

		res.json({
			status: 'SUCCESS',
			message: 'Đăng nhập thành công!',
			payload: user,
		})
	} catch (error) {
		console.log(error)
		res.sendStatus(500)
	}
})

// @route   POST api/auth/login
// @desc    Login a admin
// @access  Public
router.post('/login/admin', async (req, res) => {
	try {
		const { email, password } = req.body

		if (!email || !checkIsEmail(email)) {
			return res.json({
				status: 'FAIL',
				code: 001,
				message: 'Email không hợp lệ!',
			})
		}

		const user = await User.findOne({
			where: { email },
			include: [
				{
					model: UserRole,
					required: true,
					attributes: ['role'],
				},
			],
		})

		if (!user) {
			return res.json({
				status: 'FAIL',
				code: 601,
				message: 'Email không tồn tại!',
			})
		}

		if (!user.password) {
			return res.json({
				status: 'FAIL',
				code: 613,
				message: 'Vui lòng đăng nhập bằng phương thức khác!',
			})
		}

		if (!bcryptjs.compareSync(password, user.password)) {
			return res.json({
				status: 'FAIL',
				code: '002',
				message: 'Mật khẩu không đúng!',
			})
		}

		if (user.verified === false) {
			return res.json({
				status: 'FAIL',
				code: 603,
				message: 'Email chưa được xác minh!',
			})
		}

		const print = JSON.parse(JSON.stringify(user))

		if (!user?.userRoles?.some((userRole) => userRole.role === 'ADMIN')) {
			return res.json({
				status: 'FAIL',
				code: 614,
				message: 'Tài khoản không phải admin!',
			})
		}

		setAuthCooki({
			res,
			userId: user.id,
			userRoles: user.userRoles.map((item) => item.role),
		})

		res.json({
			status: 'SUCCESS',
			message: 'Đăng nhập thành công!',
			payload: user,
		})
	} catch (error) {
		console.log(error)
		res.sendStatus(500)
	}
})

// @route   GET api/auth/logout
// @desc    Logout a user
// @access  Public
router.get('/logout', (req, res) => {
	try {
		res.cookie('jwt', '', { maxAge: 0, httpOnly: true })
		res.json({
			status: 'SUCCESS',
			message: 'Logout user and delete cooki successfully!',
		})
	} catch (error) {
		console.log(error)
		res.sendStatus(500)
	}
})

// @route   POST api/auth/oauth/google
// @desc    Get user's google profile after get access token
// @access  Public
router.post('/oauth/google', async (req, res) => {
	const transaction = await sequelize.transaction()
	try {
		const { access_token, redirectURL } = req.body

		// Get user data from google api
		const { data } = await axios.get(
			`https://www.googleapis.com/oauth2/v1/userinfo?alt=json`,
			/**
			 * This is link without header to get user's profile
			 * `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`
			 */
			{
				headers: { Authorization: `Bearer ${access_token}` },
			}
		)

		// Check access token
		if (!data) {
			return res.json({ status: 'FAIL', message: 'Invalid access token!' })
		}

		let user = await User.findOne({
			where: { email: data.email },
			include: [
				{
					model: UserRole,
					required: true,
					attributes: ['role'],
				},
			],
			transaction,
			lock: true,
		})

		if (!user) {
			user = await User.create(
				{
					email: data.email,
					password: '',
					name: data.name,
					verified: true,
					avatar: data.avatar,
				},
				{ transaction, lock: true }
			)
			await UserRole.create(
				{ userId: user.id, role: 'CLIENT' },
				{ transaction, lock: true }
			)
			user = await User.findOne({
				where: { id: user.id },
				include: [
					{
						model: UserRole,
						required: true,
						attributes: ['role'],
					},
				],
				transaction,
				lock: true,
			})
		}

		setAuthCooki({
			res,
			userId: user.id,
			userRoles: user.userRoles.map((item) => item.role),
		})

		await transaction.commit()

		res.json({
			status: 'SUCCESS',
			message: 'Đăng nhập bằng google thành công!',
			payload: user,
		})
	} catch (error) {
		await transaction.rollback()
		console.log(error)
		res.sendStatus(500)
	}
})

// @route   POST api/auth/oauth/google
// @desc    Get user's github profile after get github code
// @access  Public
router.post('/oauth/github', async (req, res) => {
	const transaction = await sequelize.transaction()
	try {
		const { code } = req.body

		// Get access token from github code
		const { data } = await axios.post(
			`https://github.com/login/oauth/access_token`,
			{},
			{
				headers: {
					Accept: 'application/json',
				},
				params: {
					client_id: process.env.GITHUB_CLIENT_ID,
					client_secret: process.env.GITHUB_CLIENT_SECRET,
					code,
				},
			}
		)

		const axiosGetUserData = await axios.get(`https://api.github.com/user`, {
			headers: { Authorization: `Bearer ${data.access_token}` },
		})

		const githubUserData = axiosGetUserData.data

		if (!githubUserData.email) {
			return res.json({
				status: 'FAIL',
				code: 801,
				message:
					'Tài khoản Github của bạn không có email, vui lòng chọn phương thức đăng nhập khác !',
			})
		}

		let user = await User.findOne({
			where: { email: githubUserData.email },
			include: [
				{
					model: UserRole,
					required: true,
					attributes: ['role'],
				},
			],
			transaction,
			lock: true,
		})

		if (!user) {
			user = await User.create(
				{
					email: githubUserData.email,
					password: '',
					name: githubUserData.name,
					verified: true,
					avatar: githubUserData.avatar_url,
				},
				{ transaction, lock: true }
			)
			await UserRole.create(
				{ userId: user.id, role: 'CLIENT' },
				{ transaction, lock: true }
			)
			user = await User.findOne({
				where: { id: user.id },
				include: [
					{
						model: UserRole,
						required: true,
						attributes: ['role'],
					},
				],
				transaction,
				lock: true,
			})
		}

		setAuthCooki({
			res,
			userId: user.id,
			userRoles: user.userRoles.map((item) => item.role),
		})

		await transaction.commit()

		res.json({
			status: 'SUCCESS',
			message: 'Đăng nhập bằng github thành công!',
			payload: user,
		})
	} catch (error) {
		await transaction.rollback()
		console.log(error)
		res.sendStatus(500)
	}
})

module.exports = router
