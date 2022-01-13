const genericRepository = require("./genericRepository");
const driverModel = require('../models/drivers');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const carModel = require('../models/cars');

class DriversRepository extends genericRepository {

    async getDriversForComfort(comfortId) {
        const result = await driverModel.findAll({
            include: {
                model: carModel,
                where: {
                    id: Sequelize.col('drivers.car_id'),
                    comfortId: comfortId
                }
            }
        });
        return result;
    }
}

module.exports = new DriversRepository(driverModel);