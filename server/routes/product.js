const express = require('express')
const router = express.Router()
const Product = require('../models/product')
const getAggregate = require('../utilities/getAggregate')
const Types = require('mongoose').Types

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
		await Product.updateMany({}, { createAt: Date.now() })
	} catch (error) {
		console.log(error)
		res.sendStatus(500)
	}
})

// @route   POST api/product/filter
// @desc    Filter and get products
// @access  Public
router.post('/filter', async (req, res) => {
	try {
		const { filter, sort, keyword } = req.body
		const aggregate = getAggregate({ filter, keyword, sort })
		const result = await Product.aggregate(aggregate)
		return res.json(result)
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
		const product = await Product.aggregate([
			{
				$match: {
					_id: Types.ObjectId(req.params.id),
				},
			},
			{
				$unwind: '$inventory',
			},
			{
				$lookup: {
					from: 'colors',
					localField: 'inventory.color',
					foreignField: '_id',
					as: 'inventory.color',
				},
			},
			{
				$unwind: '$inventory.color',
			},
			{
				$unwind: '$inventory.size',
			},
			{
				$lookup: {
					from: 'sizes',
					localField: 'inventory.size',
					foreignField: '_id',
					as: 'inventory.size',
				},
			},
			{
				$unwind: '$inventory.size',
			},
			{
				$group: {
					_id: '$_id',
					name: {
						$first: '$name',
					},
					images: {
						$first: '$images',
					},
					category: {
						$first: '$category',
					},
					brand: {
						$first: '$brand',
					},
					description: {
						$first: '$description',
					},
					available: {
						$first: '$available',
					},
					unit: {
						$first: '$unit',
					},
					price: {
						$first: '$price',
					},
					inventory: {
						$push: '$$ROOT.inventory',
					},
				},
			},
		])

		if (product.length === 1) {
			return res.json({
				status: 'SUCCESS',
				message: 'Lấy thông tin chi tiết của sản phẩm thành công!',
				payload: product[0],
			})
		} else {
			return res.json({
				status: 'FAIL',
				message: 'Lấy thông tin chi tiết của sản phẩm thất bại!',
			})
		}
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
		const {
			name,
			images,
			category,
			brand,
			available,
			unit,
			price,
			description,
			inventory,
		} = req.body

		console.log({ ...req.body })

		const product = new Product({
			name,
			images,
			category,
			brand,
			available,
			unit,
			price,
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
