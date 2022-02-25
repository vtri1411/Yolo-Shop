const mongoose = require('mongoose')
const Types = mongoose.Types
const Schema = mongoose.Schema

const UserVerification = new Schema({
	userId: {
		type: Types.ObjectId,
		ref: 'user',
		required: true,
	},
	createDate: {
		type: Date,
		default: Date.now,
	},
	expiredDate: {
		type: Date,
		required: true,
	},
	secretString: {
		type: String,
		required: true,
	},
})

const VerifyUser = mongoose.model('userverification', UserVerification)
module.exports = VerifyUser
