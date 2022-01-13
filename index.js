const database = require('./src/db');
const express = require("express");
const app = express();
const loader = require('./src/loader');
const port = require('./src/env').app.port;

async function start() {
    await database.connect();
    app.use(loader);
    app.listen(port, () => console.log(`Server successfully started at port ${port}`));
}

start();