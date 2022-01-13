const ordersService = require('../services/ordersService');

class OrdersController {
    async createOrder(req, res, next) {
        try {
            const orderData = req.body;
            orderData.customerId = req.user.id;
            await ordersService.createOrder(orderData).then((result) => { res.status(201).send({ result }) });
        } catch (err) {
            return next(err);
        }
    }
    async createFeedback(req, res, next) {
        try {
            const feedbackData = req.body;
            const orderId = req.params.id;
            const userId = req.user.id;
            await ordersService.createFeedback(orderId, userId, feedbackData).then((result) => { res.status(201).send({ result }) });
        } catch (err) {
            return next(err);
        }
    }
    async getAllOrdersOfUser(req, res, next) {
        try {
            const userId = req.user.id;
            await ordersService.getAllOrders(userId).then((result) => { res.status(200).send(result) });
        } catch (err) {
            return next(err);
        }
    }
    async getOrderById(req, res, next) {
        try {
            const orderId = req.params.id;
            await ordersService.getOrder(orderId).then((result) => { res.status(200).send(result) });
        } catch (err) {
            return next(err);
        }
    }
    async cancelOrder(req, res, next) {
        try {
            const orderId = req.params.id;
            await ordersService.cancelOrder(orderId).then((result) => { res.status(200).send(result) });
        } catch (err) {
            return next(err);
        }
    }
    async acceptOrder(req, res, next) {
        try {
            const orderId = req.params.id;
            const driverId = req.user.driverId;
            await ordersService.acceptOrder(orderId, driverId).then((result) => { res.status(200).send(result) });
        } catch (err) {
            return next(err);
        }
    }
    async closeOrder(req, res, next) {
        try {
            const orderId = req.params.id;
            await ordersService.closeOrder(orderId).then((result) => { res.status(200).send(result) });
        } catch (err) {
            return next(err);
        }
    }
    async getAllOrdersWithUsers(req, res, next) {
        try {
            await ordersService.getAllOrdersWithUsers().then((result) => { res.status(200).send(result) });
        } catch (err) {
            return next(err);
        }
    }
}

module.exports = new OrdersController();