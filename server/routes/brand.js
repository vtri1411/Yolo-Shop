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

module.exports = router
