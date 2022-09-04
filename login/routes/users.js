const express = require('express')
const router = express.Router()

const usersController = require('../controllers/users')

router.get('/signup', usersController.signupForm)
router.get('/login', usersController.loginForm)
router.post('/signup', usersController.signup)
router.post('/login', usersController.login)

module.exports = router
