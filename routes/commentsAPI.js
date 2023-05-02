const express = require('express');

const controller = require('../controllers/commentsAPI');

const router = express.Router();

router.post('/', controller.createComment);

router.get('/' , controller.getComments);

router.get('/:id', controller.getComment);

router.put('/:id', controller.updateComment);

router.patch('/:id', controller.patchComment);

router.delete('/:id', controller.deleteComment);

router.get('/c/:id' , controller.getCardComments);

router.get('/u/:id' , controller.getUserComments);

module.exports = router;