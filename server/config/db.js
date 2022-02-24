const mongoose = require('mongoose')

const connectDb = async () => {
	try {
		await mongoose.connect(process.env.DATABASE_CONNECTION_STRING)
		console.log('mongodb connecting . . .')
	} catch (error) {
		console.log(error)
	}
}

module.exports = connectDb
