const {Router} = require('express')
const compRouteControllers = require('../controllers/compRouteControllers')

const route = Router()

route.post('/book', compRouteControllers.book_post)

route.get('/book', compRouteControllers.book_get)

route.get('/add-pc', compRouteControllers.add_computer_get)

route.post('/add-pc', compRouteControllers.add_computer_post)

route.put('/update-info', compRouteControllers.update_put)

route.delete('/delete', compRouteControllers.delete_computer)

module.exports = route