module.exports = function errorHandler(err, req, res, next) {
    //console.log(err.message);
    console.log(err);
    res.status(err.status || 500).send(err.message);
}