const Joi = require('joi');

const CarScheme = {
    create: Joi.object().keys({
        comfortId: Joi.number().integer().required(),
        stateNumber: Joi.string().max(15).required(),
        model: Joi.string().max(50).required(),
        color: Joi.string().length(7).required().pattern(/#([A-F]|[0-9]){6}/)
    }),

};

module.exports = CarScheme;