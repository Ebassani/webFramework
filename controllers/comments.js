const Comment = require('../models/comment');

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

exports.getComments = async (req, res) => {
    Comment.find({}).then(comments => {
        res.status(201).json(comments)
    });
}

exports.getComment = async (req, res) => {
    const id = req.params.id;
    
    Comment.findById(id).then(comment => {
        res.status(201).json(comment)
    })
    .catch(err => res.status(404).json({message: 'No comment with id: ' + id}));
}

exports.getCardComments = async (req, res) => {
    const card = req.params.card;
    
    Comment.find({card}).then(comments => {
        res.status(201).json(comments)
    })
    .catch(err => res.status(404).json({message: 'Card does\'t exist or does not have comments'}));
}

exports.getUserComments = async (req, res) => {
    const user = req.params.user;
    
    Comment.find({user}).then(comments => {
        res.status(201).json(comments)
    })
    .catch(err => res.status(404).json({message: 'User does\'t exist or does not have comments'}));
}

exports.updateComment = async (req, res) => {
    const text = req.body.text;

    const id = req.params.id;

    
    User.findByIdAndUpdate(id, { username, date: Date.now }, {new: true}).then( updatedComment => {
        if (!updatedComment){
            res.status(404).json({message: 'No comment with id: ' + id})
        }
        else{
            res.status(201).json(updatedComment)
        }
    })
    .catch(err => res.status(404).json({message: 'No comment with id: ' + id}));
}
