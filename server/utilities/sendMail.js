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

module.exports = sendMail
