const mongoose = require('mongoose');

const databaseLogSchema = mongoose.Schema({
    query: String,
    date: Date
});

module.exports = databaseLogSchema;