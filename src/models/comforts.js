const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize');

const Comfort = sequelize.define('comforts', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: 'id'
    },
    typeName: {
        type: Sequelize.STRING(20),
        unique: true,
        allowNull: false,
        field: 'type_name'
    },
    startPrice: {
        type: Sequelize.DECIMAL,
        allowNull: false,
        field: 'start_price'
    },
    tariff: {
        type: Sequelize.DECIMAL,
        allowNull: false,
        field: 'tariff'
    }
});

module.exports = Comfort;