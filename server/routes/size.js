const router = require('express').Router()
const Size = require('../models/size')

// @route   GET api/size
// @desc    Get collection size
// @access  Public
router.get('/', async (req, res) => {
	try {
		const size = await Size.find()
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

module.exports = router
