const Card = require('../models/card');
const User = require('../models/user')
const Topic = require('../models/topic')
exports.createCard = async (req, res) => {
    const { title, description } = req.body;
    try
    {
        const user = await User.findOne({username: req.session.username})
        const topic = await Topic.findOne({topic: req.body.topic})
        user_id = await user._id
        topic_id = await topic._id
        const card = new Card ({ title, description, user_id, topic_id });
        await card.save();
        res.status(201).json(card)
    }
    catch(e)
    {
        console.log(e)
        res.status(500)
    }
}

exports.getCards = async (req, res) => {
    Card.find({}).then(cards => {
        res.status(200).json(cards)
    });
}

exports.getCard = async (req, res) => {
    const id = req.params.id;
    
    Card.findById(id).then(card => {
        res.status(200).json(card)
    })
    .catch(err => res.status(404).json({message: 'No card with id: ' + id}));
}

exports.getTopicCards = async (req, res) => {
    const topic = req.params.id;

    Card.find({topic}).then(cards => {
        res.status(200).json(cards)
    })
    .catch(err => res.status(404).json({message: 'Topic does\'t exist or does not have cards'}));
}

exports.getUserCards = async (req, res) => {
    const user = req.params.id;
    
    Card.find({user}).then(cards => {
        res.status(200).json(cards)
    })
    .catch(err => res.status(404).json({message: 'User does\'t exist or does not have cards'}));
}

exports.updateCard = async (req, res) => {
    const { title, description } = req.body;

    const id = req.params.id;

    User.findByIdAndUpdate(id, { title, description, date: Date.now }, {new: true}).then( updatedCard => {
        if (!updatedCard){
            res.status(404).json({message: 'No card with id: ' + id})
        }
        else{
            res.status(200).json(updatedCard)
        }
    })
    .catch(err => res.status(404).json({message: 'No card with id: ' + id}));
}

exports.patchCard = async (req, res) => {
    const { title, description, user_id, topic_id, date, likes} = req.body;

    const id = req.params.id;
    
    User.findByIdAndUpdate(id, { title, description, user_id, topic_id, date, likes}, {new: true})
    .then( updatedCard => {
        if (!updatedCard){
            res.status(404).json({message: 'No card with id: ' + id})
        }
        else{
            res.status(200).json(updatedCard)
        }
    })
    .catch(err => res.status(404).json({message: 'No card with id: ' + id}));
}

exports.deleteCard = async (req, res) => {
    const id = req.params.id;

    await Card.deleteOne({_id : id})
    .catch(err => res.status(404).json({message: 'No card with id: ' + id}));

    Card.find({}).then(card => {
        res.status(200).json(card)
    });
}