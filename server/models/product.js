const mongoose = require('mongoose')
const Types = mongoose.Types
const Schema = mongoose.Schema

const productSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	images: [
		{
			type: String,
			required: true,
		},
	],
	category: {
		type: Types.ObjectId,
		required: true,
		ref: 'category',
	},
	brand: {
		type: Types.ObjectId,
		required: true,
		ref: 'brand',
	},
	description: {
		type: String,
		required: true,
	},
	available: {
		type: Boolean,
		required: true,
	},
	unit: {
		type: String,
	},
	price: {
		type: Number,
		required: true,
	},
	createAt: {
		type: Date,
		default: Date.now,
	},
	inventory: [
		{
			size: {
				type: Types.ObjectId,
				required: true,
				ref: 'size',
			},
			color: {
				type: Types.ObjectId,
				required: true,
				ref: 'color',
			},
			amount: {
				type: Number,
				required: true,
			},
		},
	],
})

const Product = mongoose.model('product', productSchema)
module.exports = Product
