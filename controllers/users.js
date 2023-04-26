const User = require('../models/users');

const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
    const { username, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash(password, salt);

    /* Check if password is the same as hash 
    const result = await bcrypt.compare(plaintextPassword, hashedFromDatabase);
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

exports.getUser = async (req, res) => {
    const id = req.params.id;
    
    User.findById(id).then(user => {
        res.json(user)
    })
    .catch(err => res.status(404).json({message: 'No user with id: ' + id}));
}

exports.updateUser = async (req, res) => {
    const { username, password } = req.body;

    const id = req.params.id;

    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash(password, salt);

    
    User.findByIdAndUpdate(id, { username, password: pass }, {new: true}).then( updatedUser => {
        if (!updatedUser){
            res.status(404).json({message: 'No user with id: ' + id})
        }
        else{
            res.status(201).json(updatedUser)
        }
    })
    .catch(err => res.status(404).json({message: 'No user with id: ' + id}));
}

exports.patchUser = async (req, res) => {
    const { username, password, email } = req.body;

    const id = req.params.id;

    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash(password, salt);

    
    User.findByIdAndUpdate(id, { username, password: pass, email }, {new: true}).then( updatedUser => {
        if (!updatedUser){
            res.status(404).json({message: 'No user with id: ' + id})
        }
        else{
            res.status(201).json(updatedUser)
        }
    })
    .catch(err => res.status(404).json({message: 'No user with id: ' + id}));
}


exports.deleteUser = async (req, res) => {
    const id = req.params.id;

    await User.deleteOne({_id : id});

    User.find({}).then(users => {
        res.json(users)
    })
    .catch(err => res.status(404).json({message: 'No user with id: ' + id}));
}