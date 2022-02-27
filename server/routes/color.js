const router = require('express').Router()
const Color = require('../models/color')

// @route   GET api/size
// @desc    Get collection size
// @access  Public
router.get('/', async (req, res) => {
	try {
		const size = await Color.find()
		if (!size) {
			return res.json({
				status: 'FAIL',
				message: 'There is no record in color collecton!',
			})
		}

		return res.json({
			status: 'SUCCESS',
			message: 'Get color collection success',
			payload: size,
		})
	} catch (error) {
		console.log(error)
		res.sendStatus(500)
	}
})

// @route   POST api/color
// @desc    Create a new color
// @access
router.post('/', async (req, res) => {
	try {
		const { colorName, hex } = req.body

		if (!colorName || !hex) {
			return res.json({
				status: 'FAIL',
				message: 'Tên màu hoặc mã màu không hợp lệ!',
			})
		}

		const color = new Color({ name: colorName, hex })
		await color.save()

		res.json({
			status: 'SUCCESS',
			message: 'Create a new color success!',
			payload: color,
		})
	} catch (error) {
		console.log(error)
		res.sendStatus(500)
	}
})

module.exports = router
