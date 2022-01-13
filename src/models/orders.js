const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize');

const Order = sequelize.define('orders', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: 'id'
    },
    customerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'customer_id'
    },
    driverId: {
        type: Sequelize.INTEGER,
        field: 'driver_id'
    },
    date: {
        type: Sequelize.DATE,
        field: 'date'
    },
    startPointX: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        field: 'start_point_x'
    },
    startPointY: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        field: 'start_point_y'
    },
    endPointX: {
        type: Sequelize.DOUBLE,
        field: 'end_point_x'
    },
    endPointY: {
        type: Sequelize.DOUBLE,
        field: 'end_point_y'
    },
    price: {
        type: Sequelize.DECIMAL,
        field: 'price'
    },
    passedDistance: {
        type: Sequelize.DOUBLE,
        field: 'passed_distance'
    },
    status: {
        type: Sequelize.ENUM,
        values: ['new', 'canceled', 'closed', 'in progress'],
        defaultValue: 'new',
        field: 'status'
    }
});

module.exports = Order;