const router = require('express').Router()

const {
	Product,
	User,
	Size,
	Color,
	Cart,
	Inventory,
	Op,
	sequelize,
	QueryTypes,
	OrderHistory,
} = require('../models/index')

const auth = require('../middlewares/auth')

const { getUserCartQuery } = require('../utilities/query')

// @route   GET api/cart/check
// @desc    Get and check user's cart
// @access  Private
router.get('/', auth, async (req, res) => {
	try {
		const cart = await sequelize.query(getUserCartQuery(req.user), {
			type: QueryTypes.SELECT,
		})

		res.json({ status: 'SUCCESS', payload: cart })
	} catch (error) {
		console.log(error)
		res.sendStatus(500)
	}
})

// @route   POST api/cart/addProduct
// @desc    Add product to user's cart
// @access  Private
router.post('/addProduct', auth, async (req, res) => {
	try {
		const { inventoryId, quantity } = req.body

		console.log({ ...req.body, user: req.user })
		if (!inventoryId || quantity <= 0) {
			return res.json({
				status: 'FAIL',
				message: 'Invalid inventory id or quantity!',
			})
		}

		const user = await User.findByPk(req.user)

		if (!user) {
			return res.json({ status: 'FAIL', message: 'Invalid user!' })
		}

		// Check if product existe in cart
		const cartExisted = await Cart.findOne({
			where: {
				inventoryId: inventoryId,
				userId: req.user,
			},
		})

		// If product exist, update the increase quantity by new quantity
		if (cartExisted) {
			// Check quantity after plus is greater or equal than inventory mount
			const inventory = await Inventory.findAll({
				where: {
					id: inventoryId,
					amount: {
						[Op.gte]: 1,
					},
				},
			})

			if (!inventory) {
				return res.json({
					status: 'FAIL',
					message: 'Số lượng sản phẩm trong kho không đủ!',
				})
			}

			// Update cart
			const rowUpdated = await Cart.update(
				{ quantity: cartExisted.quantity + quantity },
				{
					where: {
						inventoryId: inventoryId,
						userId: req.user,
					},
				}
			)

			if (rowUpdated === 0) {
				return res.json({
					status: 'FAIL',
					message: 'Server error!',
				})
			}

			return res.json({
				status: 'SUCCESS',
			})
		}

		// Check amount in stock is >= quantity
		const inventory = await Inventory.findByPk(inventoryId, {
			where: {
				amount: {
					[Op.gte]: quantity,
				},
			},
		})
		if (!inventory) {
			return res.json({
				status: 'FAIL',
				message: 'Số lượng sản phẩm muốn mua vượt quá số hàng trong kho!',
			})
		}

		const newProduct = await Cart.create({
			quantity: quantity,
			userId: req.user,
			inventoryId: inventoryId,
		})

		return res.json({
			status: 'SUCCESS',
		})
	} catch (error) {
		console.log(error)
		res.sendStatus(500)
	}
})

// @route   POST api/cart/changeQuantity
// @desc    Change product's quantity
// @access  Private
router.post('/changeQuantity', auth, async (req, res) => {
	try {
		// req.body.quantity is quantity after update
		const { quantity, inventoryId } = req.body

		// Check quantity > 0
		if (quantity <= 0) {
			return res.json({
				status: 'FAIL',
				message: 'Số lượng sản phẩm không hợp lệ!',
			})
		}

		// Check amount in stock is >= quantity
		const inventory = await Inventory.findByPk(inventoryId, {
			where: {
				amount: {
					[Op.gte]: quantity,
				},
			},
		})
		if (!inventory) {
			return res.json({
				status: 'FAIL',
				message: 'Số lượng sản phẩm trong kho không đủ!',
			})
		}

		const rowUpdated = await Cart.update(
			{ quantity: quantity },
			{
				where: { inventoryId: inventoryId, userId: req.user },
			}
		)

		if (rowUpdated === 0) {
			return res.json({
				status: 'FAIL',
				message: 'Invalid user!',
			})
		}

		res.json({ status: 'SUCCESS' })
	} catch (error) {
		console.log(error)
		res.sendStatus(500)
	}
})

// @route   DELETE api/cart/addProduct
// @desc    Delete product
// @access  Private
router.delete('/', auth, async (req, res) => {
	try {
		const { inventoryId } = req.body

		const rowDeleted = await Cart.destroy({
			where: { inventoryId: inventoryId, userId: req.user },
		})

		if (rowDeleted === 0) {
			return res.json({ status: 'FAIL', message: 'No row is deleted!' })
		} else {
			return res.json({ status: 'SUCCESS' })
		}
	} catch (error) {
		console.log(error)
		res.sendStatus(500)
	}
})

module.exports = router
