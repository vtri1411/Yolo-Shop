const { v4: uuidv4 } = require('uuid')
const bcrypt = require('bcryptjs')
const constants = require('../config/constants')

module.exports = function (id) {
	const secretString = uuidv4() + id
	const hashString = bcrypt.hashSync(secretString, constants.TIMES_GEN_SALT)

	return { secretString, hashString }
}
