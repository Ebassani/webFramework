const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	date: { type: Date, default: Date.now },
	likes: { type: Number, default: 0 },
})

//mongoose.model create a collection lowercase + add 's' ex:Card => cards
module.exports = mongoose.model('Card', productSchema)
