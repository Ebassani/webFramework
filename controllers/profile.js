const User = require('../models/user')
const Card = require('../models/card')

exports.getIndex = async (req, res) => {
    
    try {
        //retrive logged in user data
        const user = await User.findOne({ username: req.session.username })
        const id = await user._id
        const card = await Card.find({ user_id: id })
        const tr = await fetch('http://localhost:3000/api/topics')
        //console.log(card)
        //console.log(id)
        trending = await tr.json()

        //redirect and send the data to the ejs file, so it can be used inside the html structure
        res.render('profile/profile', { pageTitle: 'Profile Page', user: user, card: card, trending: trending, path: "/" })
    }
    catch (error) {
        console.log(error)
    }
}
exports.visitProfile = async (req, res) => {

    //this function works if you want to visit somebody's page it gets the data of this user
    let username = req.params.username
    //retrive user data 
    const user = await User.findOne({ username: username })
    if (user === null) { res.redirect('/') } else {
        const id = await user._id
        const card = await Card.find({ user_id: id })
        const tr = await fetch('http://localhost:3000/api/topics')

        trending = await tr.json()

        res.render('profile/visitprofile', { pageTitle: "Profile " + username, user: user, card: card, trending: trending, path: "/" + username })
    }




}