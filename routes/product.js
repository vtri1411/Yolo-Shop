const router = require('express').Router()

const {
	Product,
	Brand,
	Category,
	Image,
	Inventory,
	Size,
	Color,
	Op,
	Sequelize,
} = require('../models/index')
const getOrderObject = require('../utilities/getOrderObject')

// @route   GET api/product
// @desc    Get products
// @access  Public
router.get('/', async (req, res) => {
	try {
		const products = await Product.findAll({
			include: [
				{
					model: Brand,
					required: true,
				},
				{
					model: Category,
					required: true,
				},
				{
					model: Image,
					required: true,
					attributes: ['url'],
				},
				{
					model: Inventory,
					required: true,
					include: [
						{
							model: Color,
							required: true,
						},
						{
							model: Size,
							required: true,
						},
					],
				},
			],
		})

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

// @route   POST api/product/filter
// @desc    Filter and get products
// @access  Public
router.post('/filter', async (req, res) => {
	try {
		const { filter, sort, keyword } = req.body
		const { color, size, brand, category } = filter ? filter : {}

		console.log({ filter, sort, keyword })

		const where = []
		const order = {}

		if (Array.isArray(color) && color.length > 0) {
			const colorFilter = []
			color.forEach((item) => {
				colorFilter.push({
					['$inventories.color.id$']: item,
				})
			})

			where.push({
				[Op.or]: colorFilter,
			})
		}
		if (Array.isArray(size) && size.length > 0) {
			const sizeFilter = []

			size.forEach((item) => {
				sizeFilter.push({
					['$inventories.size.id$']: item,
				})
			})
			where.push({
				[Op.or]: sizeFilter,
			})
		}
		if (Array.isArray(brand) && brand.length > 0) {
			const brandFilter = []

			brand.forEach((item) => {
				brandFilter.push({
					['$brand.id$']: item,
				})
			})
			where.push({
				[Op.or]: brandFilter,
			})
		}
		if (Array.isArray(category) && category.length > 0) {
			const categoryFilter = []
			category.forEach((item) => {
				categoryFilter.push({
					['$category.id$']: item,
				})
			})
			where.push({
				[Op.or]: categoryFilter,
			})
		}

		if (keyword) {
			where.push(
				Sequelize.literal(
					`MATCH (product.name,product.description) AGAINST ("${keyword}" IN NATURAL LANGUAGE MODE)`
				)
			)
		}

		if (sort) {
			order.order = getOrderObject(sort)
		}

		console.log({ where, order })

		const products = await Product.findAll({
			where: {
				[Op.and]: where,
			},
			include: [
				{
					model: Brand,
					required: true,
					as: 'brand',
				},
				{
					model: Category,
					required: true,
					as: 'category',
				},
				{
					model: Image,
					required: true,
					as: 'images',
				},
				{
					model: Inventory,
					required: true,
					as: 'inventories',
					include: [
						{
							model: Color,
							required: true,
							as: 'color',
						},
						{
							model: Size,
							required: true,
							as: 'size',
						},
					],
				},
			],
			...order,
		})

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
		const product = await Product.findByPk(req.params.id, {
			include: [
				{
					model: Brand,
					required: true,
				},
				{
					model: Category,
					required: true,
				},
				{
					model: Image,
					required: true,
				},
				{
					model: Inventory,
					required: true,
					include: [
						{
							model: Size,
							required: true,
						},
						{
							model: Color,
							required: true,
						},
					],
				},
			],
		})

		if (product) {
			res.json({ status: 'SUCCESS', payload: product })
		} else {
			res.json({ status: 'FAIL', message: 'Id không hợp lệ' })
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
			description,
			available,
			unit,
			price,
			categoryId,
			gender,
			brandId,
			images,
			inventory,
		} = req.body

		const product = await Product.create({
			name,
			description,
			available,
			unit,
			gender,
			price,
			categoryId,
			brandId,
		})

		// Upload image
		if (Array.isArray(images)) {
			const promises = []
			images.forEach((image) => {
				promises.push(Image.create({ url: image, productId: product.id }))
			})
			await Promise.all(promises)
		}

		// Add product in inventory
		if (Array.isArray(inventory)) {
			const promises = []
			inventory.forEach((item) => {
				promises.push(
					Inventory.create({
						amount: item.amount,
						sizeId: item.size,
						colorId: item.color,
						productId: product.id,
					})
				)
			})
			await Promise.all(promises)
		}

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
