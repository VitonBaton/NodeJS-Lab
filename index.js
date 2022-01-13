const database = require('./src/db');
const express = require("express");
const app = express();
const loader = require('./src/loader');
const port = require('./src/env').app.port;

const swaggerUI = require('swagger-ui-express');
const swaggerDoc = require('./src/swagger/openapi.json');

async function start() {
    await database.connect();

    app.use(loader);
    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

    app.listen(port, () => console.log(`Server successfully started at port ${port}`));
}

start();