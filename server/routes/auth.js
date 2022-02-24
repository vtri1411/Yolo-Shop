const express = require('express')
const auth = require('../middlewares/auth')
const User = require('../models/user')
const router = express.Router()
const bcryptjs = require('bcryptjs')
const setAuthCooki = require('../utilities/setAuthCooki')
const { checkIsPhone, checkIsEmail } = require('../utilities/validator')

// @route   GET api/auth
// @desc    Get user account
// @access  Private
router.get('/', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user).select('-password')
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
		const { email, phone, password } = req.body

		console.log({ email, phone, password })

		if (email && checkIsEmail(email)) {
			const user = await User.findOne({ email })

			const isCorrectPassword = await bcryptjs.compare(
				password,
				user.password
			)

			if (isCorrectPassword) {
				const payload = { user: user._id }

				const token = setAuthCooki(res, payload)
				delete user._doc.password
				res.json({ user: user._doc })
			}
			return
		}

		if (phone && checkIsPhone(phone)) {
			const user = await User.findOne({ phone })

			const isCorrectPassword = await bcryptjs.compare(
				password,
				user.password
			)
			if (isCorrectPassword) {
				const payload = { user: user._id }

				const token = setAuthCooki(res, payload)
				delete user._doc.password
				res.json({ user })
			}
			return
		}

		res.sendStatus(400)
	} catch (error) {
		console.log(error)
		res.sendStatus(500)
	}
})

module.exports = router
