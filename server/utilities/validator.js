function checkIsPhone(phone) {
	if (/^\d+$/.test(phone)) {
		return true
	}
	return false
}

function checkIsEmail(email) {
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
		return true
	}

	return false
}

module.exports = { checkIsEmail, checkIsPhone }
