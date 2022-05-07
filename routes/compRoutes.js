const {Router} = require('express')
const compRouteControllers = require('../controllers/compRouteControllers')

const route = Router()

route.post('/book', compRouteControllers.book_post)

route.get('/book', compRouteControllers.book_get)

route.post('/add', compRouteControllers.computer_post)

route.put('/update_info', compRouteControllers.update_put)

route.delete('/delete', compRouteControllers.delete_computer)

module.exports = route