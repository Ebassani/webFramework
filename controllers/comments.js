const Comment = require('../models/comment');

exports.getComments = async (req, res) => {
    Comment.find({}).then(comments => {
        res.status(201).json(comments)
    });
}

exports.getCardComments = async (req, res) => {
    const card = req.params.card;
    
    Comment.find({card}).then(comments => {
        res.status(201).json(comments)
    })
    .catch(err => res.status(404).json({message: 'Card does\'t exist or does not have comments'}));
}

exports.createComment = async (req, res) => {
    const { text, user, card } = req.body;

    const comment = new Comment ({
        text,
        user,
        card
    });

    await comment.save();

    res.status(201).json(comment)
}
