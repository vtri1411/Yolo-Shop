const mongoose = require('mongoose')
const Schema = mongoose.Schema

const brandSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
})

const Brand = mongoose.model('brand', brandSchema)
module.exports = Brand
