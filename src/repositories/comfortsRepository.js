const genericRepository = require("./genericRepository");
const comfortModel = require('../models/comforts');

module.exports = new genericRepository(comfortModel);