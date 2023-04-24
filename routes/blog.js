const express = require('express')

const blogController = require('../controllers/cards')

const router = express.Router()

router.get('/', blogController.getCards)

module.exports = router
