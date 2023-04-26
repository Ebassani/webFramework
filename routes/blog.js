const express = require('express')

const blogController = require('../controllers/blog')

const router = express.Router()

router.get('/', blogController.getIndex)

router.post('/add-card', blogController.getAddCard)
// router.post('/add-card', adminController.postAddCard)

module.exports = router
