const Joi = require('joi');

const DriverScheme = {
    create: Joi.object().keys({
        carId: Joi.number().integer().required(),
        userId: Joi.number().integer().required()
    }),
    changeCar: Joi.object().keys({
        carId: Joi.number().integer().required()
    })
};

module.exports = DriverScheme;