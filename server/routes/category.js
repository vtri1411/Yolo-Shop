const router = require('express').Router()
const Category = require('../models/category')

// @route   GET api/category
// @desc    Get collection category
// @access  Public
router.get('/', async (req, res) => {
	try {
		const category = await Category.find()
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
// @access
router.post('/', async (req, res) => {
	try {
		const { categoryName } = req.body

		if (!categoryName) {
			return res.json({
				status: 'FAIL',
				message: 'Tên loại không hợp lệ!',
			})
		}

		const category = new Category({ name: categoryName })
		await category.save()

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
