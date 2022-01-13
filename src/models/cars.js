const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize');

const Car = sequelize.define('cars', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: 'id'
    },
    stateNumber: {
        type: Sequelize.STRING(15),
        allowNull: false,
        field: 'state_number'
    },
    model: {
        type: Sequelize.STRING(50),
        allowNull: false,
        field: 'model'
    },
    color: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'color'
    },
    comfortId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'comfort_id'
    }
});

module.exports = Car;