const User = require('../models/users');

const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
    const { username, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash(password, salt);

    /* Check if password is the same as hash 
    const result = await bcrypt.compare(plaintextPassword, hash);
    return result; */
    
    const user = new User({ 
        username,
        email, 
        password: pass
    });
  
    await user.save();
  
    res.status(201).json(user);
};

exports.getUsers = async (req, res) => {
    User.find({}).then(users => {
        res.json(users)
    });
}