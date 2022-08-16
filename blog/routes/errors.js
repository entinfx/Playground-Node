const express = require('express')
const errorsController = require('../controllers/errors')

const router = express.Router()

router.use(errorsController.notFound) // why doesn't 'router.get' not work?

module.exports = router
