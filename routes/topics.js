const express = require('express')

const controller = require('../controllers/topics')

const router = express.Router()

router.post('/', controller.createTopic)

router.get('/', controller.getTopics)

router.get('/:id', controller.getTopic)

router.put('/:id', controller.updateTopic)

router.patch('/:id', controller.patchTopic)

router.delete('/:id', controller.deleteTopic)

module.exports = router
