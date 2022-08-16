const express = require('express')
const postsController = require('../controllers/posts')

const router = express.Router()

router.get('/', postsController.index)
router.get('/new', postsController.form)
router.get('/:id', postsController.show)
router.post('/', postsController.create)
router.delete('/:id', postsController.destroy)

module.exports = router
