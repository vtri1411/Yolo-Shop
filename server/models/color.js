const mongoose = require('mongoose')
const Schema = mongoose.Schema

const colorSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	hex: {
		type: String,
		required: true,
	},
})

const Color = mongoose.model('color', colorSchema)
module.exports = Color
