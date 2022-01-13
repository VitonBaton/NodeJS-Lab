const Joi = require('joi');
const notAcceptableError = require('../errors/notAcceptableError');

module.exports = schema => {
    return (req, res, next) => {
        const error = schema.validate(req.body).error;
        if (error) {
            next(new notAcceptableError(error.details[0].message));
        }
        next();
    };
};