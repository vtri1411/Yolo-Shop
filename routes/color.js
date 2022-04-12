const router = require('express').Router()

const { Color } = require('../models/index')

const auth = require('../middlewares/auth')
const adminAuth = require('../middlewares/admin-auth')

// @route   GET api/color
// @desc    Get all color
// @access  Public
router.get('/', async (req, res) => {
	try {
		const colors = await Color.findAll()
		if (!colors) {
			return res.json({
				status: 'FAIL',
				message: 'There is no record in color collecton!',
			})
		}

		return res.json({
			status: 'SUCCESS',
			message: 'Get color collection success',
			payload: colors,
		})
	} catch (error) {
		console.log(error)
		res.sendStatus(500)
	}
})

// @route   POST api/color
// @desc    Create a new color
// @access  Admin 
router.post('/',adminAuth,  async (req, res) => {
	try {
		const { colorName, hex } = req.body

      if (!req?.userRoles?.include('ADMIN')) {
			return res.json({ status: 'FAIL', message: 'No permission' })
		}

		if (!colorName || !hex) {
			return res.json({
				status: 'FAIL',
				message: 'Tên màu hoặc mã màu không hợp lệ!',
			})
		}

		const color = await Color.create({ name: colorName, hex })

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
