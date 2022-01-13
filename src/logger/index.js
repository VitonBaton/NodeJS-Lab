const mongoose = require('mongoose');

const httpLog = mongoose.model('httpLog', require('../schemes/httpLog'));
const databaseLog = mongoose.model('databaseLog', require('../schemes/databaseLog'));

class Logger {
    async httpLog(req, res, next) {
        try {
            const log = new httpLog({
                route: req.path,
                date: new Date(),
                method: req.method,
                body: req.body,
                params: req.params,
                query: req.query

            });
            await log.save();
            next();
        } catch (err) {
            console.log(err);
        }
    }

    async databaselog(query) {
        try {
            const log = new databaseLog({
                query: query,
                date: new Date()
            });
            await log.save();
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = new Logger();