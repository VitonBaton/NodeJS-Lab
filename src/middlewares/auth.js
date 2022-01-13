const roles = require('../utils/constants').roles;
const forbiddenError = require('../errors/forbiddenError');

module.exports = {
    isUser: (req, res, next) => {
        if (req.user.role != roles.user && req.user.role != roles.driver && req.user.role != roles.admin) {
            next(new forbiddenError('Not enought rights'));
        }
        next();
    },
    isDriver: (req, res, next) => {
        if (req.user.role != roles.driver) {
            next(new forbiddenError('Not enought rights'));
        }
        next();
    },
    isAdmin: (req, res, next) => {
        if (req.user.role != roles.admin) {
            next(new forbiddenError('Not enought rights'));
        }
        next();
    }
};