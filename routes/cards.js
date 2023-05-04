const express = require('express');

const controller = require('../controllers/cards');

const router = express.Router();

router.get('/:id', controller.cardPage);

module.exports = router;