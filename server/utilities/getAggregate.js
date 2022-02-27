const Types = require('mongoose').Types
const Product = require('../models/product')

module.exports = function ({ filter, sort, keyword }) {
	let aggregate = []

	if (!filter) filter = {}
	if (!sort) sort = ''
	if (!keyword) keyword = ''

	const { category, brand, color, size } = filter

	console.log({ category, brand, color, size })

	// Keyword
	if (keyword) {
		aggregate.push({
			$match: {
				$text: {
					$search: keyword,
				},
			},
		})
	}

	// Category
	if (Array.isArray(category)) {
		const categoryMap = category.map((item) => {
			return { category: Types.ObjectId(item) }
		})
		if (categoryMap.length > 1) {
			aggregate.push({
				$match: {
					$or: categoryMap,
				},
			})
		}
		if (categoryMap.length === 1) {
			aggregate.push({
				$match: {
					category: Types.ObjectId(category[0]),
				},
			})
		}
	}

	// Brand
	if (Array.isArray(brand)) {
		const brandMap = brand.map((item) => {
			return { brand: Types.ObjectId(item) }
		})
		if (brandMap.length > 1) {
			aggregate.push({
				$match: {
					$or: brandMap,
				},
			})
		}
		if (brandMap.length === 1) {
			aggregate.push({
				$match: {
					brand: Types.ObjectId(brand[0]),
				},
			})
		}
	}

	// Color
	if (Array.isArray(color)) {
		const colorMap = color.map((item) => {
			return { color: Types.ObjectId(item) }
		})
		if (colorMap.length > 1) {
			aggregate.push({
				$match: {
					inventory: {
						$elemMatch: {
							$or: colorMap,
						},
					},
				},
			})
		}
		if (colorMap.length === 1) {
			aggregate.push({
				$match: {
					inventory: {
						$elemMatch: {
							color: Types.ObjectId(color[0]),
						},
					},
				},
			})
		}
	}

	// Size
	if (Array.isArray(size)) {
		const sizeMap = size.map((item) => {
			return { color: Types.ObjectId(item) }
		})
		if (sizeMap.length > 1) {
			aggregate.push({
				$match: {
					inventory: {
						$elemMatch: {
							$or: sizeMap,
						},
					},
				},
			})
		}
		if (sizeMap.length === 1) {
			aggregate.push({
				$match: {
					inventory: {
						$elemMatch: {
							size: Types.ObjectId(size[0]),
						},
					},
				},
			})
		}
	}

	// Sort
	if (sort) {
		let sortFormated = {}
		switch (sort) {
			case 'NEWEST':
				sortFormated.createAt = -1
				break
			case 'OLDEST':
				sortFormated.createAt = 1
				break
			case 'PRICE_ASC':
				sortFormated.price = 1
				break
			case 'PRICE_DESC':
				sortFormated.price = -1
				break
			default:
				throw new Error('Sort is not match with any case!')
		}
		aggregate.push({
			$sort: sortFormated,
		})
	}

	return aggregate
}
