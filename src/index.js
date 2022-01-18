const database = require('./db');
const express = require("express");
const app = express();
const loader = require('./loader');
const env = require('./env');
const mongoose = require('mongoose');

const swaggerUI = require('swagger-ui-express');
const swaggerDoc = require('./swagger/openapi.json');


const Gateway = require('micromq/gateway');

const gateway = new Gateway({
    microservices: ['mailer'],
    rabbit: {
        url: "amqp://guest:guest@localhost:5672",
    },
})


async function start() {
    mongoose.connect(
        `mongodb://localhost:${env.mongo.port}/taxi_logs`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    );
    await database.connect();

    app.use(gateway.middleware());
    app.use(loader);
    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));
}

start();

module.exports = app;