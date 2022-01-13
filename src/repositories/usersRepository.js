const genericRepository = require("./genericRepository");
const userModel = require('../models/users');


module.exports = new genericRepository(userModel);