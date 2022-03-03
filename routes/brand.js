const router = require('express').Router()

const { Brand } = require('../models/index')

// @route   GET api/brand
// @desc    Get brand data
// @access  Public
router.get('/', async (req, res) => {
	try {
		const brands = await Brand.findAll()
		if (!brands) {
			return res.json({
				status: 'FAIL',
				message: 'There is no record in collecton brand!',
				payload: brands,
			})
		}

		return res.json({
			status: 'SUCCESS',
			message: 'Get brand collection success',
			payload: brands,
		})
	} catch (error) {
		console.log(error)
		res.sendStatus(500)
	}
})

// @route   POST api/brand
// @desc    Create a new brand
// @access
router.post('/', async (req, res) => {
	try {
		const { brandName } = req.body

		if (!brandName) {
			return res.json({
				status: 'FAIL',
				message: 'Tên thương hiệu không hợp lệ!',
			})
		}

		const brand = await Brand.create({ name: brandName })

		res.json({
			status: 'SUCCESS',
			message: 'Create a new brand success!',
			payload: brand,
		})
	} catch (error) {
		console.log(error.errors)
		res.sendStatus(500)
	}
})

module.exports = router
