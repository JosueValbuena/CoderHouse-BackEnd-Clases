const orderModel = require("../models/orders.models");

class Order {
    getOrder = async () => {
        try {
            let result = await orderModel.find();
            return result;
        } catch (error) {
            console.log(error.message);
            return null
        };
    };

    getOrderById = async (id) => {
        try {
            let result = await orderModel.findOne({ _id: id });
            return result;
        } catch (error) {
            console.log(error.message);
            return null
        };
    };

    createOrder = async (order) => {
        try {
            let result = await orderModel.create(order);
            return result;
        } catch (error) {
            console.log(error.message);
            return null
        };
    };

    resolverOrder = async (id, order) => {
        try {
            let result = await orderModel.create({ _id: id }, { $set: order });
            return result;
        } catch (error) {
            console.log(error.message);
            return null
        };
    };
}

module.exports = Order;