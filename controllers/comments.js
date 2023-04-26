const Comment = require('../models/comment');

exports.getComments = async (req, res) => {
    Comment.find({}).then(comments => {
        res.status(201).json(comments)
    });
}

exports.getCardomments = async (req, res) => {
    const card = req.params.card;
    
    Comment.find({card}).then(comments => {
        res.status(201).json(comments)
    })
    .catch(err => res.status(404).json({message: 'Card does\'t exist or does not have comments'}));
}
