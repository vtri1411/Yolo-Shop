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
} = require('../models/index')

const auth = require('../middlewares/auth')

const { getUserCartQuery } = require('../utilities/query')

// @route   GET api/cart/check
// @desc    Get and check user's cart
// @access  Private
router.get('/', auth, async (req, res) => {
	try {
		const cart = await sequelize.query(getUserCartQuery(req.userId), {
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

		console.log({ ...req.body, userId: req.userId })
		if (!inventoryId || quantity <= 0) {
			return res.json({
				status: 'FAIL',
				message: 'Invalid inventory id or quantity!',
				code: 603,
			})
		}

		const user = await User.findByPk(req.userId)

		if (!user) {
			return res.json({
				status: 'FAIL',
				message: 'Invalid user!',
				code: 606,
			})
		}

		// Check if product existe in cart
		const cartExisted = await Cart.findOne({
			where: {
				inventoryId: inventoryId,
				userId: req.userId,
			},
		})

		// If product exist, update the increase quantity by new quantity
		if (cartExisted) {
			// Check quantity after plus is greater or equal than inventory mount
			const inventory = await Inventory.findOne({
				where: {
					id: inventoryId,
					amount: {
						[Op.gte]: quantity + cartExisted.quantity,
					},
				},
			})

			if (!inventory) {
				return res.json({
					status: 'FAIL',
					message: 'Số lượng sản phẩm trong kho không đủ!',
					code: 610,
				})
			}

			// Update cart
			const rowUpdated = await Cart.update(
				{ quantity: cartExisted.quantity + quantity },
				{
					where: {
						inventoryId: inventoryId,
						userId: req.userId,
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
		const inventory = await Inventory.findOne({
			where: {
				id: inventoryId,
				amount: {
					[Op.gte]: quantity,
				},
			},
		})
		if (!inventory) {
			return res.json({
				status: 'FAIL',
				message: 'Số lượng sản phẩm trong kho không đủ!',
				code: 610,
			})
		}

		const newProduct = await Cart.create({
			quantity: quantity,
			userId: req.userId,
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
		const { quantity, inventoryId } = req.body

		const cartExisted = await Cart.findOne({
			where: {
				userId: req.userId,
				inventoryId: inventoryId,
			},
		})

		// Check cart existed
		if (!cartExisted) {
			return res.json({
				status: 'FAIL',
				message: 'Product in cart not found!',
			})
		}

		// Add product
		if (quantity > 0) {
			// Check amount in stock is >= quantity
			const inventory = await Inventory.findOne({
				where: {
					id: inventoryId,
					amount: {
						[Op.gte]: quantity + cartExisted.quantity,
					},
				},
			})

			if (!inventory) {
				return res.json({
					status: 'FAIL',
					message: 'Số lượng sản phẩm trong kho không đủ!',
					code: 610,
				})
			}
		}

		// Reduce product
		if (cartExisted.quantity + quantity <= 0) {
			return res.json({
				status: 'FAIL',
				message: 'Product Quantity can not less or equal than 0!',
			})
		}

		const rowUpdated = await Cart.update(
			{ quantity: cartExisted.quantity + quantity },
			{
				where: { inventoryId: inventoryId, userId: req.userId },
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
			where: { inventoryId: inventoryId, userId: req.userId },
		})

		if (rowDeleted === 0) {
			return res.json({
				status: 'FAIL',
				message: 'No product in cart is deleted!',
			})
		} else {
			return res.json({ status: 'SUCCESS' })
		}
	} catch (error) {
		console.log(error)
		res.sendStatus(500)
	}
})

module.exports = router
