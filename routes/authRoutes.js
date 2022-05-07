const {Router} = require('express')
const authController = require('../controllers/authControllers')

const route = Router()

route.get('/login', authController.login_get)

route.post('/login', authController.login_post)

route.get('/logout', authController.logout_get)

route.get('/signup', authController.signup_get)

route.post('/signup', authController.signup_post)

route.put('/update_info', authController.update_put)

route.delete('/delete')

module.exports = route