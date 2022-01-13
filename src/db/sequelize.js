const Sequelize = require("sequelize");
const env = require('../env');
const logger = require('../logger');

const sequelize = new Sequelize(
    env.db.name,
    env.db.user,
    env.db.pass, {
        host: env.db.host,
        port: env.db.port,
        dialect: 'postgres',
        logging: msg => logger.databaselog(msg)
    }
);
module.exports = sequelize;