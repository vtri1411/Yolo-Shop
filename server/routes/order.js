const router = require('express').Router()

const {
	sequelize,
	QueryTypes,
	User,
	Cart,
	OrderHistory,
	Inventory,
	Size,
	Color,
	Product,
	Image,
} = require('../models/index')

const auth = require('../middlewares/auth')

const { getUserCartQuery } = require('../utilities/query')

// @route   GET api/order
// @desc    Get user's order history
// @access  Private
router.get('/', auth, async (req, res) => {
	try {
		const orderHistory = await OrderHistory.findAll({
			where: { userId: req.user },
			attributes: { exclude: ['inventoryId', 'userId'] },
			include: [
				{
					model: Inventory,
					required: true,
					attributes: {
						exclude: ['amount', 'productId', 'sizeId', 'colorId'],
					},
					include: [
						{
							model: Size,
							required: true,
						},
						{
							model: Color,
							required: true,
						},
						{
							model: Product,
							required: true,
							attributes: ['name', 'price'],
							include: [
								{ model: Image, required: true, attributes: ['url'] },
							],
						},
					],
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
	try {
		const promises = []

		// Check cart valid
		const cart = await sequelize.query(getUserCartQuery(req.user), {
			type: QueryTypes.SELECT,
		})

		// If there is no product in cart return error
		if (cart.length === 0) {
			return res.json({ status: 'FAIL', message: 'Giỏ hàng trống!' })
		}

		for (const item of cart) {
			console.log({ item: JSON.parse(JSON.stringify(item)) })
			if (!item.isValid) {
				return res.json({
					status: 'FAIL',
					message: 'Giỏ hàng có sản phẩm không hợp lệ!',
					payload: cart,
				})
			}
		}

		for (const item of cart) {
			// Reduce amount of inventory
			promises.push(
				Inventory.decrement('amount', {
					by: item.quantity,
					where: { id: item.inventoryId },
				})
			)

			// Add order history
			promises.push(
				OrderHistory.create({
					userId: req.user,
					inventoryId: item.inventoryId,
					quantity: item.quantity,
				})
			)

			// Delete user's cart
			promises.push(
				Cart.destroy({
					where: { userId: req.user, inventoryId: item.inventoryId },
				})
			)
		}

		await Promise.all(promises)

		res.json({
			status: 'SUCCESS',
		})
	} catch (error) {
		console.log(error)
		res.sendStatus(500)
	}
})
module.exports = router
