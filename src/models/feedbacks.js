const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize');

const Feedback = sequelize.define('feedbacks', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: 'id'
    },
    orderId: {
        type: Sequelize.INTEGER,
        field: 'order_id'
    },
    raiting: {
        type: Sequelize.INTEGER,
        validate: { max: 5, min: 0 },
        allowNull: false,
        field: 'raiting'
    },
    feedback: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'feedback'
    }
});

module.exports = Feedback;