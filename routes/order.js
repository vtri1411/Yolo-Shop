const router = require('express').Router()

const {
	sequelize,
	QueryTypes,
	Cart,
	OrderHistory,
	Inventory,
	OrderDetail,
} = require('../models/index')

const auth = require('../middlewares/auth')

const { getUserCartQuery } = require('../utilities/query')

// @route   GET api/order
// @desc    Get user's order history
// @access  Private
router.get('/', auth, async (req, res) => {
	try {
		const orderHistory = await OrderHistory.findAll({
			where: { userId: req.userId },
			include: [
				{
					model: OrderDetail,
					require: true,
				},
			],
		})
		res.json({ orderHistory: orderHistory })
	} catch (error) {
		console.log(error)
		res.sendStatus(500)
	}
})

// @route   POST api/order
// @desc    Order products in cart
// @access  Private
router.post('/', auth, async (req, res) => {
	const transaction = await sequelize.transaction()
	try {
		const promises = []

		// Check cart valid
		const cart = await sequelize.query(getUserCartQuery(req.userId), {
			type: QueryTypes.SELECT,
			lock: true,
			transaction,
		})

		// If there is no product in cart return error
		if (cart.length === 0) {
			await transaction.rollback()
			return res.json({ status: 'FAIL', message: 'Giỏ hàng trống!' })
		}

		// Check if item in cart has quantity > amount in stock
		// If condition is correct, get total price
		let totalPrice = 0
		for (const item of cart) {
			if (!item.isValid) {
				await transaction.rollback()
				return res.json({
					status: 'FAIL',
					message: 'Giỏ hàng có sản phẩm không hợp lệ!',
					payload: cart,
				})
			}
			totalPrice += item.quantity * item.price
		}

		// Add order history
		const orderHistory = await OrderHistory.create(
			{
				userId: req.userId,
				totalPrice,
			},
			{ transaction, lock: true }
		)

		for (const item of cart) {
			// Reduce amount of inventory
			promises.push(
				Inventory.decrement('amount', {
					by: item.quantity,
					where: { id: item.inventoryId },
					transaction,
					lock: true,
				})
			)

			// Create order detail
			promises.push(
				OrderDetail.create(
					{
						orderHistoryId: orderHistory.id,
						inventoryId: item.inventoryId,
						quantity: item.quantity,
					},
					{ lock: true, transaction }
				)
			)

			// Delete user's cart
			promises.push(
				Cart.destroy(
					{
						where: { userId: req.userId, inventoryId: item.inventoryId },
						transaction,
					},
					{ lock: true }
				)
			)
		}

		await Promise.all(promises)
		await transaction.commit()

		res.json({
			status: 'SUCCESS',
		})
	} catch (error) {
		await transaction.rollback()
		console.log(error)
		res.sendStatus(500)
	}
})
module.exports = router
