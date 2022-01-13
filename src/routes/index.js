const express = require('express');
const passport = require('passport');
const usersRouter = require('./usersRouter');
const driversRouter = require('./driversRouter');
const ordersRouter = require('./ordersRouter');
const loginRouter = require('./loginRouter');
const errorsHandler = require('../middlewares/errorsHandler');
const router = express.Router();
const logger = require('../logger');

router.use(logger.httpLog);
router.use('/', loginRouter);
router.use('/users', passport.authenticate('jwt', { session: false }), usersRouter);
router.use('/drivers', passport.authenticate('jwt', { session: false }), driversRouter);
router.use('/orders', passport.authenticate('jwt', { session: false }), ordersRouter);
router.use(errorsHandler);
module.exports = router;