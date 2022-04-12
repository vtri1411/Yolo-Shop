const router = require('express').Router()

const { Category } = require('../models/index')

const auth = require('../middlewares/auth')
const adminAuth = require('../middlewares/admin-auth')

// @route   GET api/category
// @desc    Get collection category
// @access  Public
router.get('/', async (req, res) => {
	try {
		const category = await Category.findAll()
		if (!category) {
			return res.json({
				status: 'FAIL',
				message: 'There is no record in collecton category!',
			})
		}

		return res.json({
			status: 'SUCCESS',
			message: 'Get category collection success',
			payload: category,
		})
	} catch (error) {
		console.log(error)
		res.sendStatus(500)
	}
})

// @route   POST api/category
// @desc    Create a new category
// @access  Admin
router.post('/', adminAuth, async (req, res) => {
	try {
		const { name } = req.body

		if (!name) {
			return res.json({
				status: 'FAIL',
				message: 'Tên loại không hợp lệ!',
			})
		}

		const category = await Category.create({ name })

		res.json({
			status: 'SUCCESS',
			message: 'Create a new category success!',
			payload: category,
		})
	} catch (error) {
		console.log(error)
		res.sendStatus(500)
	}
})

module.exports = router
