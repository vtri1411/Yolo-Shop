const express = require('express')
const router = express.Router()
const Order = require('../models/order')
const Product = require('../models/product')
const Types = require('mongoose').Types
const auth = require('../middlewares/auth')
const formatResult_GetIsCorrect = require('../utilities/formatResult_GetIsCorrect')

// @route   POST api/order
// @desc    Checkout products
// @access  Private
router.post('/', auth, async (req, res) => {
	try {
		// const { productId, color, size, quantity } = req.body
		const { products } = req.body

		let promises = []

		/**
		 * Check if any product haven't enough amount and
		 * Add needed infomation to the result
		 */
		products.forEach((product) => {
			promises.push(
				Product.aggregate([
					{
						$match: {
							_id: Types.ObjectId(product._id),
						},
					},
					{ $unwind: { path: '$inventory', includeArrayIndex: 'index' } },
					{
						$match: {
							['inventory.color']: product.color,
							['inventory.size']: product.size,
							['inventory.amount']: { $gt: product.quantity },
						},
					},
					{
						$addFields: {
							quantity: product.quantity,
							size: '$inventory.size',
							color: '$inventory.color',
							price: '$inventory.price',
						},
					},
					{
						$project: {
							_id: 1,
							index: 1,
							quantity: 1,
							size: 1,
							color: 1,
							price: 1,
						},
					},
				])
			)
		})

		const resultChecking = await Promise.all(promises)
		// Format products result for easily working with
		const { newArray, isCorrect } = formatResult_GetIsCorrect(resultChecking)

		// Update product amount
		promises = []

		newArray.forEach((item) => {
			promises.push(
				Product.updateOne(
					{ _id: Types.ObjectId(item._id) },
					{
						$inc: {
							[`inventory.${item.index}.amount`]: -item.quantity,
						},
					}
				)
			)
		})

		await Promise.all(promises)

		// Create order history
		const order = new Order({
			userId: req.user,
			productList: newArray.map((item) => ({
				productId: item._id,
				quantity: item.quantity,
				size: item.size,
				color: item.color,
				price: item.price,
			})),
		})
		await order.save()
		res.json({ order })
	} catch (error) {
		console.log(error)
		res.sendStatus(500)
	}
})

module.exports = router
