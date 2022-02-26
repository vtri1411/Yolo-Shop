const express = require('express')
const router = express.Router()
const Product = require('../models/product')

// @route   GET api/product
// @desc    Get products
// @access  Public
router.get('/', async (req, res) => {
	try {
		const products = await Product.find()
		res.json({
			status: 'SUCCESS',
			message: 'Lấy danh sách sản phẩm thành công!',
			payload: products,
		})
	} catch (error) {
		console.log(error)
		res.sendStatus(500)
	}
})

// @route   GET api/product/:id
// @desc    Get product by id
// @access  Public
router.get('/:id', async (req, res) => {
	try {
		const product = Product.findById(req.params.id)
		res.json({
			status: 'SUCCESS',
			message: 'Lấy thông tin chi tiết của sản phẩm thành công!',
			payload: product,
		})
	} catch (error) {
		console.log(error)
		res.sendStatus(500)
	}
})

// @route   POST api/product
// @desc    Create a new product
// @access
router.post('/', async (req, res) => {
	try {
		const { name, image01, image02, category, description, inventory } =
			req.body

		console.log({
			name,
			image01,
			image02,
			category,
			description,
			inventory,
		})

		const product = new Product({
			name,
			category,
			image01,
			image02,
			description,
			inventory,
		})

		await product.save()

		res.json({
			status: 'SUCCESS',
			message: 'Thêm sản phẩm thành công!',
			payload: product,
		})
	} catch (error) {
		console.log(error)
		res.sendStatus(500)
	}
})

module.exports = router
