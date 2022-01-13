const Joi = require('joi');

const FeedbackScheme = {
    create: Joi.object().keys({
        raiting: Joi.number().integer().min(0).max(5).required(),
        feedback: Joi.string().required()
    })
};

module.exports = FeedbackScheme;