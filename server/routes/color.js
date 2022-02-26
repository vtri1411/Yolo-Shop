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

module.exports = router
