const express = require('express')
const errorsController = require('../controllers/errors')

const router = express.Router()

router.get(errorsController.notFound)

module.exports = router
