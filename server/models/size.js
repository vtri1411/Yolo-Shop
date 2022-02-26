const mongoose = require('mongoose')
const Schema = mongoose.Schema

const sizeSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
})

const Size = mongoose.model('size', sizeSchema)
module.exports = Size
