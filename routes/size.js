const router = require('express').Router()

const { Size } = require('../models/index')

// @route   GET api/size
// @desc    Get all size
// @access  Public
router.get('/', async (req, res) => {
	try {
		const size = await Size.findAll()

		if (!size) {
			return res.json({
				status: 'FAIL',
				message: 'There is no record in collecton size!',
			})
		}

		return res.json({
			status: 'SUCCESS',
			message: 'Get size collection success',
			payload: size,
		})
	} catch (error) {
		console.log(error)
		res.sendStatus(500)
	}
})

// @route   POST api/size
// @desc    Create a new size
// @access
router.post('/', async (req, res) => {
	try {
		const { name } = req.body

		if (!name) {
			return res.json({
				status: 'FAIL',
				message: 'Tên size không hợp lệ!',
			})
		}

		const size = await Size.create({ name: name })

		res.json({
			status: 'SUCCESS',
			message: 'Create a new size success!',
			payload: size,
		})
	} catch (error) {
		console.log(error)
		res.sendStatus(500)
	}
})

module.exports = router
