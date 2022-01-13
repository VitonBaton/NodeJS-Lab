const mongoose = require('mongoose');

const httpLogSchema = mongoose.Schema({
    route: String,
    date: Date,
    method: String,
    body: {},
    params: {},
    query: {}
});

module.exports = httpLogSchema;