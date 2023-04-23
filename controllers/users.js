const User = require('../models/users');

exports.createUser = async (req, res) => {
    const { username, email, password } = req.body;
  
    const user = new User({ 
        username, 
        email, 
        password 
    });
  
    await user.save();
  
    res.status(201).json(user);
};

exports.getUsers = async (req, res) => {
    User.find({}).then(users => {
        res.json(users)
    });
}