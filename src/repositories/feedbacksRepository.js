const genericRepository = require("./genericRepository");
const feedbackModel = require('../models/feedbacks');
const orderModel = require('../models/orders');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class FeedbacksRepository extends genericRepository {

    async getFeedbacks(driverId) {
        const orders = (await orderModel.findAll({ where: { driverId: driverId }, attributes: ['id'] })).map((elem) => elem.id);
        const result = await feedbackModel.findAll({
            where: {
                orderId: {
                    [Op.in]: orders
                }
            }
        });
        return result;
    }
}

module.exports = new FeedbacksRepository(feedbackModel);