const User = require('../models/user')
const Card = require('../models/card')
const Comment = require('../models/comment')
exports.getIndex = async(req, res) => {
    try
    {
        const user = await User.findOne({username: req.session.username})
        const id = await user._id
        const card = await Card.find({user_id: id})
        const tr = await fetch('http://localhost:3000/api/topics')
        //console.log(card)
        //console.log(id)
        trending = await tr.json()
        res.render('profile/profile', {pageTitle: 'Profile Page', user: user,card: card,trending: trending, path:"/"})
    }
    catch(error){
        console.log(error)
    }
}