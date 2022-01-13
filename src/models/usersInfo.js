const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize');

const UserInfo = sequelize.define('users_info', {
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
    avatar: {
        type: Sequelize.STRING,
        field: 'avatar'
    },
    name: {
        type: Sequelize.STRING,
        field: 'name'
    },
    surname: {
        type: Sequelize.STRING,
        field: 'surname'
    },
    dof: {
        type: Sequelize.DATE,
        field: 'date_of_birth'
    },
    phoneNumber: {
        type: Sequelize.STRING(18),
        field: 'phone_number'
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: { isEmail: true },
        field: 'email'
    }
});

module.exports = UserInfo;