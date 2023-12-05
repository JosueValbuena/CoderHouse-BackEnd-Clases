const Router = require('express').Router;
const {
    getOrders,
    getOrderById,
    createOrder,
    resolveOrder
} = require('../controllers/orders.controller.js');

const ordersRouter = Router();

ordersRouter.get('/', getOrders);
ordersRouter.get('/:oid', getOrderById);
ordersRouter.post('/', createOrder);
ordersRouter.get('/:oid', resolveOrder);

module.exports = ordersRouter;