const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize');

const Driver = sequelize.define('drivers', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: 'id'
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'user_id'
    },
    carId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'car_id'
    },
    raiting: {
        type: Sequelize.DOUBLE(3, 2),
        defaultValue: 0,
        validate: { max: 5, min: 0 },
        allowNull: false,
        field: 'raiting'
    }
});

module.exports = Driver;