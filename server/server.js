const express = require('express')
const connectDb = require('./config/db')
require('dotenv').config()
const cookieParser = require('cookie-parser')
const sendMail = require('./utilities/sendMail')

const app = express()

// Connect DB
connectDb()

// Cors
app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', `http://localhost:3000`)
	res.header('Access-Control-Allow-Credentials', true)
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	)
	next()
})

// Init Middleware
app.use(express.json())
app.use(cookieParser())

app.use('/api/user', require('./routes/user'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/product', require('./routes/product'))
app.use('/api/order', require('./routes/order'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
	console.log(`listening at port ${PORT}  . . . `)
})
