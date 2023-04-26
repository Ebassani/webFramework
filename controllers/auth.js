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

module.exports = { validateUserCredentials };