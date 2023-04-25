const express = require('express');

const User = require('../models/users');
const controller = require('../controllers/users')

const router = express.Router();

router.post('/', controller.createUser);

router.get('/' , controller.getUsers);

router.get('/:id', controller.getUser);

router.put('/:id', controller.updateUser);

module.exports = router;