const jwt = require('jsonwebtoken')

module.exports = function ({ res, userId, userRoles }) {
	const token = jwt.sign(
		{ userId: userId, userRoles },
		process.env.JWT_SECRET,
		{
			expiresIn: Number.parseInt(process.env.TOKEN_EXPIRED) / 1000,
		}
	)

	res.cookie('jwt', token, {
		maxAge: Number.parseInt(process.env.TOKEN_EXPIRED),
		httpOnly: true,
	})
}
