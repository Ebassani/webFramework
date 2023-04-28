const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
		likes: { type: Number, default: 0 },
	},
	{ timestamps: true }
)

//mongoose.model create a collection lowercase + add 's' ex:Card => cards
module.exports = mongoose.model('Card', productSchema)
