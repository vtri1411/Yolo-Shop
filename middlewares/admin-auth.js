const jwt = require('jsonwebtoken')

const adminAuth = (req, res, next) => {
	try {
		const token = req.cookies.jwt

		if (!token) {
			return res
				.status(400)
				.json({ status: 'FAIL', message: 'There is no cooki!' })
		}

		const { userId, userRoles } = jwt.verify(token, process.env.JWT_SECRET)
		// console.log({ userRoles })
		const hasAdminRole = userRoles?.some((role) => role === 'ADMIN')
		if (!hasAdminRole) {
			return res.status(403).send('Forbidden!')
		}

		req.userId = userId
		next()
	} catch (error) {
		console.log(error)
		res.cookie('jwt', '', { maxAge: 0, httpOnly: true })
		res.sendStatus(401)
	}
}

module.exports = adminAuth
