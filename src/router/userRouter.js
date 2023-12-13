'use strict'


const express = require('express')
const userRouter = express.Router()

const userController = require('../controller/userController')


userRouter.route('/api/users')
.get((req, res) => userController.getUsers(req, res))
.post((req, res) => userController.createUser(req, res))
.put((req, res) => userController.updateUser(req, res))
.delete((req, res) => userController.deleteUser(req, res))


userRouter.route('/api/users/:id')
.get((req, res) => userController.getUser(req, res))

userRouter.route('/login').post((req, res) => userController.login(req, res));


module.exports = userRouter
