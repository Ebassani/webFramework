const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema({
	title: { type: String, required: true },
	imageUrl: { type: String, required: true },
	description: { type: String, required: true },
	date: { type: Date, required: true },
	likes: { type: Number, required: true },
})

//mongoose.model create a collection lowercase + add 's' ex:Card => cards
module.exports = mongoose.model('Card', productSchema)
