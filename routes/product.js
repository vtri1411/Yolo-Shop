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
	QueryTypes,
	sequelize,
} = require('../models/index')

const auth = require('../middlewares/auth');

const getOrderString = require('../utilities/getOrderString')
const { getProductsQuery } = require('../utilities/query')



// @route   POST GET api/product
// @desc    Filter and get products
// @access  Public
router.post('/filter', async (req, res) => {
	try {
		const { filter, sort, keyword, limit, offset } = req.body
		const { color, size, brand, category, gender } = filter ? filter : {}

		let where = []
		if (Array.isArray(category) && category.length > 0) {
			let categoryStr = ''
			category.forEach((item, index) => {
				if (index === 0) {
					categoryStr += `categoryId = ${item} `
				} else {
					categoryStr += `or categoryId = ${item} `
				}
			})
			where.push(`(${categoryStr})`)
		}
		if (Array.isArray(color) && color.length > 0) {
			let colorStr = ''
			color.forEach((item, index) => {
				if (index === 0) {
					colorStr += `colorId = ${item} `
				} else {
					colorStr += `or colorId = ${item} `
				}
			})
			where.push(`(${colorStr})`)
		}
		if (Array.isArray(size) && size.length > 0) {
			let sizeStr = ''
			size.forEach((item, index) => {
				if (index === 0) {
					sizeStr += `sizeId = ${item} `
				} else {
					sizeStr += `or sizeId = ${item} `
				}
			})
			where.push(`(${sizeStr})`)
		}
		if (Array.isArray(brand) && brand.length > 0) {
			let brandStr = ''
			brand.forEach((item, index) => {
				if (index === 0) {
					brandStr += `brandId = ${item} `
				} else {
					brandStr += `or brandId = ${item} `
				}
			})
			where.push(`(${brandStr})`)
		}
		if (Array.isArray(gender) && gender.length > 0) {
			let genderStr = ''
			gender.forEach((item, index) => {
				if (index === 0) {
					genderStr += ` gender = ${item} `
				} else {
					genderStr += ` or gender = ${item} `
				}
			})
			where.push(`(${genderStr})`)
		}

		if (where.length > 0) {
			where = where.join(' and ')
		} else {
			where = ''
		}

		if (keyword) {
			if (where) {
				where += ` and MATCH(name, description) AGAINST("${keyword}" IN NATURAL LANGUAGE MODE)`
			} else {
				where += ` MATCH(name, description) AGAINST("${keyword}" IN NATURAL LANGUAGE MODE)`
			}
		}

		const products = await sequelize.query(
			getProductsQuery({
				where: where,
				limit,
				offset,
				sort: getOrderString(sort),
			}),
			{ type: QueryTypes.SELECT }
		)

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
router.post('/',auth, async (req, res) => {
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

      if (!req?.userRoles?.include('ADMIN')) {
			return res.json({ status: 'FAIL', message: 'No permission' })
		}

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
