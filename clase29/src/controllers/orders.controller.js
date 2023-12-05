const Order = require('../dao/classes/orders.dao.js');
const Business = require('../dao/classes/business.dao.js');
const User = require('../dao/classes/users.dao.js');

const businessServices = new Business();
const orderServices = new Order();
const userServices = new User();

const getOrders = async (req, res) => {
    let result = await orderServices.getOrder();
    res.send({ result: 'success', payload: result });
};

const getOrderById = async (req, res) => {
    const { oid } = req.params;
    let result = await orderServices.getOrderById(oid);
    res.send({ result: 'success', payload });
};

const createOrder = async (req, res) => {
    const { user, business, products } = req.body;
    const resultUser = await userServices.getUserById(user);
    const resultBusiness = await businessServices.getBusinessById(business);
    let actualOrder = resultBusiness.products.filter(product => products.includes(product.id));
    let sum = actualOrder.reduce((acc, current) => acc + current, 0);
    let orderNumber = Date.now() + Math.floor(Math.random() * 1000 + 1);
    let order = {
        number: orderNumber,
        business,
        user,
        status: "Pending",
        products: actualOrder.map(product => product.id),
        totalPrice: sum
    };

    let orderResult = await orderServices.createOrder(order);
    resultUser.orders.push(orderResult._id);
    await userServices.updateUser(user, resultUser);
    res.send({ result: 'success', payload: 'Order Created' });
};

const resolveOrder = async (req, res) => {
    const { resolve } = req.query;
    let order = await orderServices.getOrderById(req.params.oid);
    order.status = resolve;
    await orderServices.resolverOrder(order._id, order);
    res.send({ result: 'success', payload: 'Orden Completada' });
};

module.exports = {
    getOrders,
    getOrderById,
    createOrder,
    resolveOrder
}