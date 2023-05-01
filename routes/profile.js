const express = require('express')
const auth = require('../controllers/auth')
const profileController = require('../controllers/profile')

const router = express.Router()

router.use(auth.requireAuthentication)
router.get('/', profileController.getIndex)

module.exports = router
