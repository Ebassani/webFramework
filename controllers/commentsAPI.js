const Comment = require('../models/comment');

exports.createComment = async (req, res) => {
    const { comment_text, user, card } = req.body;

    const comment = new Comment ({
        text: comment_text,
        user,
        card: card.slice(0,24)
    });

    await comment.save();

    res.status(201).json(comment)
}

exports.getComments = async (req, res) => {
    Comment.find({}).then(comments => {
        res.status(200).json(comments)
    });
}

exports.getComment = async (req, res) => {
    const id = req.params.id;
    
    Comment.findById(id).then(comment => {
        res.status(200).json(comment)
    })
    .catch(err => res.status(404).json({message: 'No comment with id: ' + id}));
}

exports.getCardComments = async (req, res) => {
    const card = req.params.id;

    Comment.find({card}).then(comments => {
        res.status(200).json(comments)
    })
    .catch(err => res.status(404).json({message: 'Card does\'t exist or does not have comments'}));
}

exports.getUserComments = async (req, res) => {
    const user = req.params.id;
    
    Comment.find({user}).then(comments => {
        res.status(200).json(comments)
    })
    .catch(err => res.status(404).json({message: 'User does\'t exist or does not have comments'}));
}

exports.updateComment = async (req, res) => {
    const text = req.body.text;

    const id = req.params.id;

    
    User.findByIdAndUpdate(id, { text, date: Date.now }, {new: true}).then( updatedComment => {
        if (!updatedComment){
            res.status(404).json({message: 'No comment with id: ' + id})
        }
        else{
            res.status(200).json(updatedComment)
        }
    })
    .catch(err => res.status(404).json({message: 'No comment with id: ' + id}));
}

exports.patchComment = async (req, res) => {
    const {text, user, card, date, likes} = req.body;

    const id = req.params.id;
    
    User.findByIdAndUpdate(id, {text, user, card, date, likes}, {new: true}).then( updatedComment => {
        if (!updatedComment){
            res.status(404).json({message: 'No comment with id: ' + id})
        }
        else{
            res.status(200).json(updatedComment)
        }
    })
    .catch(err => res.status(404).json({message: 'No comment with id: ' + id}));
}

exports.deleteComment = async (req, res) => {
    const id = req.params.id;

    await Comment.deleteOne({_id : id})
    .catch(err => res.status(404).json({message: 'No comment with id: ' + id}));

    Comment.find({}).then(comment => {
        res.status(200).json(comment)
    });
}