const genericRepository = require("./genericRepository");
const orderModel = require('../models/orders');
const userModel = require('../models/users');

class OrdersRepository extends genericRepository {
    async findUsersWithOrders() {
        const result = await userModel.findAll({ include: orderModel });
        return result;
    }
}

module.exports = new OrdersRepository(orderModel);