const Card = require('../models/card');
const Comment = require('../models/comment')
const User = require('../models/user')

exports.cardPage = (req, res, next) => {
    const id = req.params.id;
    
    Card.findById(id).then(card => {
        
        Comment.find({card: id}).then(comments => {
            
            let usernames = [];
            let promises = [];

            comments.forEach(comment => {
                
                let promise = User.findById(comment.user).then(user => {
                    usernames.push(user.username);
                })
                .catch(err => usernames.push('[[DELTED]]'));
                
                promises.push(promise);
            }); 

            Promise.all(promises).then(() =>{
                res.render('card/card_id', {
                    pageTitle: card.title,
                    card,
                    path: '/' + card.id,
                    comments,
                    usernames
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