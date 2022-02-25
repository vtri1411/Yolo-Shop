const bcryptjs = require('bcryptjs')
const sendEmail = require('./sendMail.js')
const constants = require('../config/constants')
const { v4: uuidv4 } = require('uuid')

const sendVerificationSecretString = async (userId, email, secretString) => {
	// Send email to the user
	const link = `${constants.ROOT_SERVER_URL}/api/user/verification/${userId}/${secretString}`

	try {
		await sendEmail({
			to: email,
			subject: 'Xác thực tài khoản Yolo Shop của bạn',
			text: `Đây là link xác thực tài khoản Yolo Shop của bạn: ${link}`,
			html: `<p>
               Đây là link xác thực tài khoản Yolo Shop của bạn: <a href='${link}' target='_blank'>Nhấn vào đây</a>
               <p><strong>Lưu ý:</strong> Link này có hiệu lực trong <strong>6 giờ</strong> kể từ khi nó được gửi!</p>
               </p>`,
		})
	} catch (error) {
		throw error
	}
}

module.exports = sendVerificationSecretString
