const express = require('express');

const User = require('../models/users');
const controller = require('../controllers/users')

const router = express.Router();

router.post('/', controller.createUser);

module.exports = router;