const express = require('express');

const controller = require('../controllers/usersAPI');

const router = express.Router();

router.post('/', controller.createUser);

router.get('/' , controller.getUsers);

router.get('/:id', controller.getUser);

router.put('/:id', controller.updateUser);

router.patch('/:id', controller.patchUser);

router.delete('/:id', controller.deleteUser)

module.exports = router;