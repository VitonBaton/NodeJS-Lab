const sequelize = require('./sequelize');
const models = require('../models');
const roles = require('../utils/constants').roles;
const comfortsRepository = require('../repositories/comfortsRepository');
const usersService = require('../services/usersService');

class Database {
    async seedComforts() {
        await comfortsRepository.create({
            id: 1,
            typeName: 'Эконом',
            startPrice: 2,
            tariff: 0.5
        });
        await comfortsRepository.create({
            id: 2,
            typeName: 'Комфорт',
            startPrice: 2.5,
            tariff: 0.6
        });
        await comfortsRepository.create({
            id: 3,
            typeName: 'Большая компания',
            startPrice: 2.7,
            tariff: 0.8
        });
        await comfortsRepository.create({
            id: 4,
            typeName: 'Детский',
            startPrice: 2.3,
            tariff: 0.6
        });
        await comfortsRepository.create({
            id: 5,
            typeName: 'Доставка',
            startPrice: 2.5,
            tariff: 0.4
        });
    }

    async connect(force) {
        try {
            await sequelize.authenticate();
            console.log('Connection successfull');
            await sequelize.sync({ force: force });

            const admin = await usersService.findByLogin('admin');
            if (!admin) {
                await usersService.createUser({
                    login: 'admin',
                    password: 'adminPass',
                    email: 'admin@taxisite.com',
                    role: roles.admin
                });
            }

            if (force) {
                await this.seedComforts();
            }
        } catch (err) {
            console.error("Can't connect to the database", err);
        }
    }
}

module.exports = new Database();