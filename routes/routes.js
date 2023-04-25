const router = require('express').Router()
const { Router } = require('express')
const ProductController = require('../controllers/products')

router.get('/products/:id?', ProductController.get)
router.post('/products', ProductController.post)

module.exports = router