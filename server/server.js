const express = require('express')
require('dotenv').config({ path: './.env' })
const { urlencoded } = require('express')
const cookieParser = require('cookie-parser')
const db = require('./models/index')
const cors = require('cors')
const path = require('path')

const app = express()

// Cors
app.use(
	cors({
		origin: 'http://localhost:3000',
		credentials: true,
	})
)

// Init Middleware
app.use(express.json())
app.use(cookieParser())
app.use(urlencoded({ extended: true }))

// Routes
app.use('/api/user', require('./routes/user'))
app.use('/api/cart', require('./routes/cart'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/product', require('./routes/product'))
app.use('/api/order', require('./routes/order'))
app.use('/api/brand', require('./routes/brand'))
app.use('/api/color', require('./routes/color'))
app.use('/api/size', require('./routes/size'))
app.use('/api/category', require('./routes/category'))

const PORT = process.env.PORT || 5000

console.log({ env: process.env.NODE_ENV })

// HOST
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '..', 'client', 'build')))

	console.log(path.join(__dirname, '..', 'client', 'build'))

	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, '..', 'client', 'build'))
	})
}

app.listen(PORT, () => {
	console.log(`listening at port ${PORT}  . . . `)
})
