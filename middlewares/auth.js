const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
	try {
		const token = req.cookies.jwt

		if (!token) {
			return res
				.status(400)
				.json({ status: 'FAIL', message: 'There is no cooki!' })
		}

		const { userId, userRoles } = jwt.verify(token, process.env.JWT_SECRET)
		req.userId = userId
		req.userRoles = userRoles
		next()
	} catch (error) {
		console.log(error)
		res.cookie('jwt', '', { maxAge: 0, httpOnly: true })
		res.sendStatus(401)
	}
}

module.exports = auth
