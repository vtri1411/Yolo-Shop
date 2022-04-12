const constants = require('../config/constants')

function getCloudinaryPublicId(url) {
	if (!url) return ''
	return (
		constants.ROOT_IMG_ASSET +
		url.substring(url.lastIndexOf('/'), url.lastIndexOf('.'))
	)
}

module.exports = { getCloudinaryPublicId }
