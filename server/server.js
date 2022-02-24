const express = require('express')
const connectDb = require('./config/db')
require('dotenv').config()
const cookieParser = require('cookie-parser')

const app = express()

// Connect DB
connectDb()

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
