'use strict'


const express = require('express')
const profileRouter = express.Router()


const profileController = require('../controller/profileController')


profileRouter.route('/api/profile')
.get((req, res) => profileController.getProfiles(req, res))
.post((req, res) => profileController.createProfile(req, res))
.put((req, res) => profileController.updateProfile(req, res))
.delete((req, res) => profileController.deleteProfile(req, res))


profileRouter.route('/api/profile/:id')
.get((req, res) => profileController.getProfile(req, res))



module.exports = profileRouter
