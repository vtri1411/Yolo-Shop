const nodemailer = require('nodemailer')
const { google } = require('googleapis')

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI

const oAuth2Client = new google.auth.OAuth2(
	CLIENT_ID,
	CLIENT_SECRET,
	REDIRECT_URI
)
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

const sendMail = async ({ to, subject, text, html, amp }) => {
	try {
		const accessToken = await oAuth2Client.getAccessToken()
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				type: 'OAuth2',
				user: '6051071126@st.utc2.edu.vn',
				clientId: CLIENT_ID,
				clientSecret: CLIENT_SECRET,
				refreshToken: REFRESH_TOKEN,
				accessToken: accessToken,
			},
		})
		const info = transporter.sendMail({
			from: '6051071126@st.utc2.edu.vn',
			to: to,
			subject: subject,
			text: text,
			html: html,
			amp: amp,
		})
		return info
	} catch (error) {
		throw error
	}
}

const sendRecoveryMail = async (userId, email, secretString, redirectUrl) => {
	const link = `${redirectUrl}/${userId}/${secretString}`

	try {
		await sendMail({
			to: email,
			subject: 'Khôi phục mật khẩu Yolo Shop của bạn',
			text: `Đây là link khôi phục mật khẩu Yolo Shop của bạn: ${link}`,
			html: `<p>
               Đây là link khôi phục mật khẩu Yolo Shop của bạn: <a href='${link}' target='_blank'>Nhấn vào đây</a>
               <p><strong>Lưu ý:</strong> Link này có hiệu lực trong <strong>1 giờ</strong> kể từ khi nó được gửi!</p>
               </p>`,
		})
	} catch (error) {
		throw error
	}
}

const sendVerificationMail = async (userId, email, secretString) => {
	// Send email to the user
	const link = `http://${process.env.HOST_ADDRESS}/api/user/verification/${userId}/${secretString}`

	try {
		await sendMail({
			to: email,
			subject: 'Xác thực tài khoản Yolo Shop của bạn',
			text: `Đây là link xác thực tài khoản Yolo Shop của bạn: `,
			html: `<p>
               Đây là link xác thực tài khoản Yolo Shop của bạn: <a href='${link}' target='_blank'>Nhấn vào đây</a>
               <p><strong>Lưu ý:</strong> Link này có hiệu lực trong <strong>6 giờ</strong> kể từ khi nó được gửi!</p>
               </p>`,
		})
	} catch (error) {
		throw error
	}
}

module.exports = { sendMail, sendVerificationMail, sendRecoveryMail }
