const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const validate = require('../middlewares/validate');
const userScheme = require('../validations/user');
const auth = require('../middlewares/auth');

router.post('/', auth.isAdmin, validate(userScheme.create), usersController.createUser);
router.get('/', auth.isAdmin, usersController.getAllUsers);
router.get('/info', auth.isUser, usersController.getUserInfoById);
router.put('/info', auth.isUser, validate(userScheme.updateInfo), usersController.updateUserInfoById);
router.patch('/password', auth.isUser, validate(userScheme.changePassword), usersController.changeUserPassword);
router.patch('/:id/freeze', auth.isAdmin, usersController.freezeUserById);
router.get('/:id', auth.isAdmin, usersController.getUserById);
router.delete('/:id', auth.isAdmin, usersController.deleteUserById);
router.patch('/:id/role', auth.isAdmin, validate(userScheme.setRole), usersController.setUserRole);


module.exports = router;