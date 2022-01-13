const Joi = require('joi');

const UserScheme = {
    create: Joi.object().keys({
        login: Joi.string().max(50).required(),
        password: Joi.string().min(4).max(20).required(),
        email: Joi.string().email().max(255).required(),
        role: Joi.string().valid('user', 'admin', 'driver')
    }),
    signup: Joi.object().keys({
        login: Joi.string().max(50).required(),
        password: Joi.string().min(4).max(20).required(),
        email: Joi.string().email().max(255).required()
    }),
    login: Joi.object().keys({
        login: Joi.string().max(50).required(),
        password: Joi.string().min(4).max(20).required()
    }),
    updateInfo: Joi.object().keys({
        dof: Joi.date().greater('now'),
        phoneNumber: Joi.string().min(4).max(20).pattern(/^\+|\d[\s\d\-\(\)]*\d$/),
        surname: Joi.string().max(255),
        name: Joi.string().max(255),
        avatar: Joi.string().max(255),
        email: Joi.string().email().max(255)
    }),
    changePassword: Joi.object().keys({
        oldPassword: Joi.string().min(4).max(20).required(),
        newPassword: Joi.string().min(4).max(20).required()
    }),
    setRole: Joi.object().keys({
        role: Joi.string().valid('user', 'admin', 'driver')
    })
};

module.exports = UserScheme;