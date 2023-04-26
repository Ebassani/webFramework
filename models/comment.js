const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    text: { type: String, required: true },
    likes: { type: Number , default: 0},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    card: { type: mongoose.Schema.Types.ObjectId, ref: 'Card', required: true },
    date: { type: Date, default: Date.now}
});


module.exports = mongoose.model('Comment', schema);