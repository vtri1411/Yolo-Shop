const mongoose = require('mongoose')
const Types = mongoose.Types
const Schema = mongoose.Schema

const productSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	image01: {
		type: String,
		required: true,
	},
	image02: { String },
	category: {
		type: Types.ObjectId,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	inventory: [
		{
			size: {
				type: String,
				required: true,
			},
			color: {
				type: String,
				required: true,
			},
			amount: {
				type: Number,
				required: true,
			},
			price: {
				type: Number,
				required: true,
			},
		},
	],
})

const Product = mongoose.model('product', productSchema)
module.exports = Product
