const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Types = mongoose.Types

const orderSchema = new Schema(
	{
		userId: {
			type: Types.ObjectId,
			required: true,
			ref: 'user',
		},
		productList: [
			{
				productId: {
					type: Types.ObjectId,
					required: true,
               ref: 'product'
				},
				quantity: {
					type: Number,
					required: true,
				},
				size: {
					type: String,
					required: true,
				},
				color: {
					type: String,
					required: true,
				},
				price: {
					type: Number,
					required: true,
				},
			},
		],
	},
	{ timeStamp: true }
)

const Order = mongoose.model('order', orderSchema)
module.exports = Order
