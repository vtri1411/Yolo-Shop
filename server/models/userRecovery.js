const mongoose = require('mongoose')
const Types = mongoose.Types
const Schema = mongoose.Schema

const userRecoverySchema = new Schema({
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

const UserRecovery = mongoose.model('userRecovery', userRecoverySchema)
module.exports = UserRecovery
