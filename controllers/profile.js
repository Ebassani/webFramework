const User = require('../models/user')

exports.getIndex = async(req, res, next) => {
    try
    {
        const user = await User.findOne({username: req.session.username})
        // console.log(user)
        res.render('profile/profile', {pageTitle: 'Profile Page', user: user, path:"/"})
    }
    catch(error){
        console.log(error)
    }
}