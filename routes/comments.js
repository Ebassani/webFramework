const express = require('express');

const controller = require('../controllers/comments');

const router = express.Router();

router.get('/' , controller.getComments);

router.get('/:card' , controller.getCardComments);

router.post('/', controller.createComment);

module.exports = router;