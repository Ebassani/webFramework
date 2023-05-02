const User = require('../models/user')
const Card = require('../models/card')
exports.getIndex = async(req, res) => {
    try
    {
        const user = await User.findOne({username: req.session.username})
        const id = await user._id
        const card = await Card.find({user_id: id})
        //console.log(card)
        //console.log(id)
        res.render('profile/profile', {pageTitle: 'Profile Page', user: user,card: card, path:"/"})
    }
    catch(error){
        console.log(error)
    }
}