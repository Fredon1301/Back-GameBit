'use strict'


const express = require('express')
const cartRouter = express.Router()

const cartController = require('../controller/cartController')


cartRouter.route('/api/cart')
  
  .post((req, res) => cartController.createCart(req, res))
  .put((req, res) => cartController.updateCart(req, res))
  .delete((req, res) => cartController.deleteCartById(req, res))
  .get((req, res) => cartController.getCart(req, res));

  
cartRouter.route('/api/cart/search')
.get((req, res) => cartController.searchMyOrders(req, res))




module.exports = cartRouter