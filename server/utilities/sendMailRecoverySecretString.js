const bcryptjs = require('bcryptjs')
const sendEmail = require('./sendMail.js')
const constants = require('../config/constants')
const { v4: uuidv4 } = require('uuid')

const sendMailRecoverySecretString = async (
	userId,
	email,
	secretString,
	redirectUrl
) => {
	// Send email to the user
	const link = `${redirectUrl}/${userId}/${secretString}`

	try {
		await sendEmail({
			to: email,
			subject: 'Khôi phục mật khẩu Yolo Shop của bạn',
			text: `Đây là link khôi phục mật khẩu Yolo Shop của bạn: ${link}`,
			html: `<p>
               Đây là link khôi phục mật khẩu Yolo Shop của bạn: <a href='${link}' target='_blank'>Nhấn vào đây</a>
               <p><strong>Lưu ý:</strong> Link này có hiệu lực trong <strong>1 giờ</strong> kể từ khi nó được gửi!</p>
               </p>`,
		})
	} catch (error) {
		console.log('\n\nemail sent\n\n')
		throw error
	}
}

module.exports = sendMailRecoverySecretString
