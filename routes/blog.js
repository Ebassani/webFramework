const express = require('express')

const blogController = require('../controllers/blog')

const router = express.Router()

router.get('/', blogController.getIndex)

router.get('/add-card', blogController.getAddCard)
router.post('/add-card', blogController.postAddCard)
router.get('/edit-card/:cardId', blogController.getEditCard)
router.post('/edit-card', blogController.postEditCard)
router.post('/delete-card', blogController.postDeleteCard)
router.get('/t/:id', blogController.getTopicsCards)

module.exports = router
