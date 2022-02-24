const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const setAuthCooki = require('../utilities/setAuthCooki')

// @route   POST api/user
// @desc    Create user account
// @access  Public
router.post('/', async (req, res) => {
	try {
		const { email, phone, password } = req.body
		let user = await User.findOne({ $or: [{ email }, { phone }] })

		// Check if user exist
		if (user) {
			return res.status(400).json({ msg: 'User has already existed' })
		}

		// Save user to database
		const hashPassword = await bcryptjs.hash(password, 10)
		user = new User({ email, phone, password: hashPassword })
		await user.save()

		// Create and set jwt
		const payload = {
			user: user._id,
		}
		// const token = jwt.sign(payload, process.env.JWT_SECRET, {
		// 	expiresIn: Number.parseInt(process.env.TOKEN_EXPIRED) / 1000,
		// })

		// res.cookie('jwt', token, {
		// 	maxAge: Number.parseInt(process.env.TOKEN_EXPIRED),
		// 	httpOnly: true,
		// })
		setAuthCooki(res, payload)

		res.json({ user })
	} catch (error) {
		console.log(error)
	}
})

module.exports = router
