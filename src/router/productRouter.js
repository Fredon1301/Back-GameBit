'use strict'

const express = require('express')
const productRouter = express.Router()

const productController = require('../controller/productController')

productRouter.route('/api/product')
  .get((req, res) => productController.getProduct(req, res))
  .post((req, res) => productController.createProduct(req, res))
  .put((req, res) => productController.updateProduct(req, res))
  .delete((req, res) => productController.deleteProduct(req, res))


productRouter.route('/api/product/search')
  .get((req, res) => productController.searchProductsByName(req, res))

module.exports = productRouter
