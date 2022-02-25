const express = require('express')
const auth = require('../middlewares/auth')
const User = require('../models/user')
const router = express.Router()
const bcryptjs = require('bcryptjs')
const setAuthCooki = require('../utilities/setAuthCooki')
const { checkIsEmail } = require('../utilities/validator')
const axios = require('axios')

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

		res.json({ user })
	} catch (error) {
		console.log(error)
		res.sendStatus(500)
	}
})

// @route   POST api/auth
// @desc    Login a user
// @access  Public
router.post('/', async (req, res) => {
	try {
		const { email, password } = req.body

		if (!email || !checkIsEmail(email)) {
			return res.status(400).send('Invalid email!')
		}

		const user = await User.findOne({ email })

		if (!user) {
			return res.status(400).send('Email not exist!')
		}

		const isCorrectPassword = await bcryptjs.compare(password, user.password)

		if (!isCorrectPassword) {
			return res.status(400).send('Incorrect password')
		}

		if (user.verified === false) {
			return res.json({ error: 'Unverified' })
		}

		setAuthCooki(res, user._id)
		delete user._doc.password
		res.json({ user: user._doc })
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
		res.json({ user })
	} catch (error) {
		console.log(error)
		res.sendStatus(500)
	}
})

module.exports = router
