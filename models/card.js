const mongoose = require('mongoose')

const Schema = mongoose.Schema

const cardSchema = new Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	date: { type: Date, default: Date.now },
	likes: { type: Number, default: 0 },
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	topic_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Topic',
		required: true,
	},
})

//mongoose.model create a collection lowercase + add 's' ex:Card => cards
module.exports = mongoose.model('Card', cardSchema)
