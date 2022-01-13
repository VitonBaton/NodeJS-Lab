const genericRepository = require("./genericRepository");
const carModel = require('../models/cars');

module.exports = new genericRepository(carModel);