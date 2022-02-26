const express = require('express')
const auth = require('../middlewares/auth')
const User = require('../models/user')
const router = express.Router()
const bcryptjs = require('bcryptjs')
const setAuthCooki = require('../utilities/setAuthCooki')
const { checkIsEmail } = require('../utilities/validator')
const axios = require('axios')
const constant = require('../config/constants')

// @route   GET api/auth
// @desc    Get user account
// @access  Private
router.get('/', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user).select('-password')

		// If there is no user match with cooki, delete cooki
		if (!user) {
			res.cookie('jwt', '', { maxAge: 0, httpOnly: true })
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

		const user = await User.findOne({ email })

		if (!user) {
			return res.json({
				status: 'FAIL',
				code: '001',
				message: 'Email không tồn tại!',
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
				code: '003',
				message: 'Email chưa được xác minh!',
			})
		}

		setAuthCooki(res, user._id)

		delete user._doc.password

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
	try {
		const { access_token } = req.body

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

		let user = await User.findOne({ email: data.email })

		if (!user) {
			user = new User({
				email: data.email,
				password: '',
				name: data.name,
				verified: true,
			})
			await user.save()
		}

		setAuthCooki(res, user._id)

		res.json({
			status: 'SUCCESS',
			message: 'Đăng nhập bằng google thành công!',
			payload: user,
		})
	} catch (error) {
		console.log(error)
		res.sendStatus(500)
	}
})

module.exports = router