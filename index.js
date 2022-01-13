const database = require('./src/db');
const express = require("express");
const app = express();
const loader = require('./src/loader');
const env = require('./src/env');
const mongoose = require('mongoose');

const swaggerUI = require('swagger-ui-express');
const swaggerDoc = require('./src/swagger/openapi.json');

async function start() {
    mongoose.connect(
        `mongodb://localhost:${env.mongo.port}/taxi_logs`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    );
    await database.connect();



    app.use(loader);
    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

    app.listen(env.app.port, () => console.log(`Server successfully started at port ${env.app.port}`));
}

start();