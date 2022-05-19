const {Router} = require('express')

const systemController = require('../controllers/systemControllers')

const route = Router()

route.get('/about', systemController.about_get)

route.get('/support', systemController.support_get)

module.exports = route