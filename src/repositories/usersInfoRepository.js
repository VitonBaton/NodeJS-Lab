const genericRepository = require("./genericRepository");
const userInfoModel = require('../models/usersInfo');

module.exports = new genericRepository(userInfoModel);