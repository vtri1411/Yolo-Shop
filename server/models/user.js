const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Types = mongoose.Types

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
	},
	password: {
		type: String,
	},
	name: {
		type: String,
	},
	address: {
		type: String,
	},
	verified: {
		type: Boolean,
		required: true,
	},
	avatar: {
		type: String,
	},
	cart: [
		{
			productId: {
				type: Types.ObjectId,
				ref: 'product',
				required: true,
			},
			color: {
				type: String,
				required: true,
			},
			size: {
				type: String,
				required: true,
			},
			quantity: {
				type: Number,
				required: true,
			},
		},
	],
})

const User = mongoose.model('user', userSchema)
module.exports = User
