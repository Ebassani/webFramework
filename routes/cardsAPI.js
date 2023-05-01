const express = require('express');

const controller = require('../controllers/cardsAPI');
const auth = require('../controllers/auth')

const router = express.Router();

router.post('/', auth.requireAuthentication, controller.createCard );

router.get('/' , controller.getCards);

router.get('/:id', controller.getCard);

router.put('/:id', controller.updateCard);

router.patch('/:id', controller.patchCard);

router.delete('/:id', controller.deleteCard);

router.get('/t/:id' , controller.getTopicCards);

router.get('/u/:id' , controller.getUserCards);

module.exports = router;