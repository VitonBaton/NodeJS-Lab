const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');
const validate = require('../middlewares/validate');
const userScheme = require('../validations/user');
const passport = require('passport');

router.post('/login', validate(userScheme.login), passport.authenticate('login'), loginController.login);
router.post('/signup', validate(userScheme.signup), loginController.signUp);


module.exports = router;