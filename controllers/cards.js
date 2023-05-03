const Card = require('../models/card');
const Comment = require('../models/comment')
const User = require('../models/user')
const Topic = require('../models/topic')

exports.cardPage = (req, res, next) => {
    const id = req.params.id;
    
    Card.findById(id).then(card => {
        
        Comment.find({card: id}).then(comments => {
            
            let usernames = [];
            let promises = [];
            let topics = [];

            let topic= {title: '[[DELETED]]', icon: '/icons/none.png'};

            let user = {name: '[[DELETED]]'};

            let promise = Topic.findById(card.topic_id).then(topic_found => {
                topic = topic_found;
            }).catch();

            promises.push(promise);
            
            promise = Topic.find().then(topics_found => topics = topics_found).catch()
            
            promises.push(promise);

            promise = User.findById(card.user_id).then(username => user = username).catch();

            promises.push(promise);

            comments.forEach(comment => {
                
                promise = User.findById(comment.user).then(user => {
                    usernames.push(user);
                })
                .catch(err => usernames.push({username: '[[DELTED]]'}));
                
                promises.push(promise);
            }); 

            Promise.all(promises).then(() =>{
                res.render('card/card_id', {
                    pageTitle: card.title,
                    card,
                    path: '/' + card.id,
                    comments,
                    usernames,
                    topic,
                    topics,
                    user
                })
            }).catch(err => res.status(400).json({message: 'Unexpected error'}))
            
        })
        .catch(err => {
            res.render('card/card_id', {
                pageTitle: card.title,
                card,
                path: '/' + card.id,
                comments: [],
            })
        });
        
    })
    .catch(err => res.status(404).json({message: 'No card with id: ' + id}));
}