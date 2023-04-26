const express = require('express');

const controller = require('../controllers/comments');

const router = express.Router();

router.post('/', controller.createComment);

router.get('/' , controller.getComments);

router.get('/:id', controller.getComment);

router.put('/:id', controller.updateComment);

router.get('/c/:id' , controller.getCardComments);

router.get('/u/:id' , controller.getUserComments);

module.exports = router;