const User = require('../models/user');
const bcrypt = require('bcrypt');

async function validateUser(username, password) {
  const user = await User.findOne({ username });
  if (!user) {
    return false;
  }
  const passwordMatch = await bcrypt.compare(password, user.password);

  return passwordMatch;
}

function requireAuthentication(req, res, next) {
  if (req.session.loggedIn) {
    return next();
  } else {
    res.redirect('/');
  }
}

async function getUser(username) {
  const user = await User.findOne({ username });

  return user;
}

module.exports = { validateUser, requireAuthentication, getUser };