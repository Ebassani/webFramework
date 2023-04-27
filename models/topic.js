const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title: { type: String, required: true },
    icon: { type: String, required: true } // Path to icon
});

module.exports = mongoose.model('Topic', schema);