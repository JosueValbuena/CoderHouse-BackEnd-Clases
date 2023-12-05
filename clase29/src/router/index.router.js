const Router = require('express').Router;
const businessRouter = require('./business.router.js')
const ordersRouter = require('./orders.router.js')
const usersRouter = require('./users.router.js')

const router = Router();

router.use('/business', businessRouter)
router.use('/order', ordersRouter)
router.use('/users', usersRouter)

module.exports = router;