const router = require('express').Router()
const Brand = require('../models/brand')

// @route   GET api/brand
// @desc    Get brand collection
// @access  Public
router.get('/', async (req, res) => {
	try {
		const size = await Brand.find()
		if (!size) {
			return res.json({
				status: 'FAIL',
				message: 'There is no record in collecton brand!',
			})
		}

		return res.json({
			status: 'SUCCESS',
			message: 'Get brand collection success',
			payload: size,
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

		const brand = new Brand({ name: brandName })
		await brand.save()

		res.json({
			status: 'SUCCESS',
			message: 'Create a new brand success!',
			payload: brand,
		})
	} catch (error) {
		console.log(error)
		res.sendStatus(500)
	}
})

module.exports = router
