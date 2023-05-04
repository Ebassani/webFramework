const express = require('express')
const auth = require('../controllers/auth')
const profileController = require('../controllers/profile')

const router = express.Router()

router.get('/', auth.requireAuthentication, profileController.getIndex)
router.get('/:username', profileController.visitProfile)
module.exports = router
