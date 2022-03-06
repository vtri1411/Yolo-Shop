module.exports = function (sort) {
	switch (sort) {
		case 'NEWEST':
			return ' createdAt DESC'
		case 'OLDEST':
			return ' createdAt ASC'
		case 'PRICE_ASC':
			return ' price ASC'
		case 'PRICE_DESC':
			return ' price DESC'
		default:
			return ''
	}
}
