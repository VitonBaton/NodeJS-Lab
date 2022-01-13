const ordersRepository = require("../repositories/ordersRepository");
const feedbacksRepository = require("../repositories/feedbacksRepository");
const driversRepository = require("../repositories/driversRepository");
const usersRepository = require("../repositories/usersRepository");
const statuses = require('../utils/constants').statuses;
const ForbiddenError = require("../errors/forbiddenError");
const NotFoundError = require("../errors/notFoundError");

class OrdersService {
    async getAllOrdersWithUsers() {
        const users = await ordersRepository.findUsersWithOrders();
        return users;
    }

    async getAllOrders(userId) {
        const result = await ordersRepository.findByQuery({ where: { customerId: userId } });
        return result;
    }

    async getOrder(orderId) {
        const result = await ordersRepository.findById(orderId);
        if (!result) {
            throw new NotFoundError('Order not found');
        }
        return result;
    }

    async acceptOrder(orderId, driverId) {
        const order = await ordersRepository.findById(orderId);
        if (!order) {
            throw new NotFoundError('Order not found');
        }

        const driver = await driversRepository.findById(driverId);
        if (!driver) {
            throw new NotFoundError('Driver not found');
        }

        order.driverId = driverId;

        if (order.status != statuses.new) {
            throw new ForbiddenError("Can't accept this order");
        }

        order.status = statuses.inProgress;
        ordersRepository.update(order);

        return order;
    }

    async createOrder(order) {
        const result = await ordersRepository.create(order);
        return result;
    }

    async cancelOrder(orderId) {
        const order = await ordersRepository.findById(orderId);
        if (order.status != statuses.new || order.status != statuses.inProgress) {
            throw new ForbiddenError("Can't cancel this order");
        }
        order.status = statuses.canceled;
        await ordersRepository.update(order);
        return order;
    }
    async closeOrder(orderId) {
        const order = await ordersRepository.findById(orderId);
        if (order.status != statuses.inProgress) {
            throw new ForbiddenError("Can't close this order");
        }
        order.status = statuses.closed;
        await ordersRepository.update(order);
        return order;
    }

    async createFeedback(orderId, userId, feedback) {
        const order = await ordersRepository.findById(orderId);
        if (order === null) {
            throw new NotFoundError('Order not found');
        }
        if (order.customerId != userId) {
            throw new ForbiddenError("You can't create feedback to this order");
        }

        feedback.orderId = orderId;
        const result = await feedbacksRepository.create(feedback);
        return result;
    }
}

module.exports = new OrdersService();