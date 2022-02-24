const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
	try {
		const token = req.cookies.jwt
		const { user } = jwt.verify(token, process.env.JWT_SECRET)
		req.user = user
		next()
	} catch (error) {
		console.log(error)
		res.sendStatus(401)
	}
}

module.exports = auth
