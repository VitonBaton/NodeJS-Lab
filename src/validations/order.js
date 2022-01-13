const Joi = require('joi');

const OrderScheme = {
    create: Joi.object().keys({
        date: Joi.date().required(),
        startPointX: Joi.number().required(),
        startPointY: Joi.number().required(),
        endPointX: Joi.number().required(),
        endPointY: Joi.number().required(),
        price: Joi.number().required(),
        passedDistance: Joi.number().required()
    })
};

module.exports = OrderScheme;