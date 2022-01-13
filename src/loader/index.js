const routes = require('../routes/');
const router = require('express').Router();
const passportRoutes = require('./passport');

router.use(passportRoutes);

router.use(routes);

module.exports = router;