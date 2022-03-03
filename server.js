require('dotenv').config()
const express = require('express')
const { urlencoded } = require('express')
const cookieParser = require('cookie-parser')
const db = require('./models/index')
const cors = require('cors')
const path = require('path')

const app = express()

// Cors
app.use(
	cors({
		// For reactjs
		origin: 'http://localhost:3000',
		credentials: true,
	})
)

app.use((req, res, next) => {
	console.log('client proxy')
	next()
})

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

// HOSTING
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, 'client', 'build')))
	app.get('/', (req, res) => {
		res.sendFile(path.join(__dirname, 'client', 'build'))
	})
	console.log('get ok')
}

app.listen(PORT, () => {
	console.log(`listening at port ${PORT}  . . . `)
	console.log(`NODE_ENV = ${process.env.NODE_ENV}`)
})
