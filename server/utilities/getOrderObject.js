module.exports = function (sort) {
	switch (sort) {
		case 'NEWEST':
			return [['updatedAt', 'DESC']]
		case 'OLDEST':
			return [['updatedAt', 'ASC']]
		case 'PRICE_ASC':
			return [['price', 'ASC']]
		case 'PRICE_DESC':
			return [['price', 'DESC']]
		default:
			throw new Error('Sort is not valid!')
	}
}
