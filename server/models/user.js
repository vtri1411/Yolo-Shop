const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
	email: {
		type: String,
	},
	phone: {
		type: String,
	},
	password: {
		type: String,
		required: true,
	},
	name: {
		type: String,
	},
	address: {
		type: String,
	},
})

const User = mongoose.model('user', userSchema)
module.exports = User
