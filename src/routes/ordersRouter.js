const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');
const validate = require('../middlewares/validate');
const orderScheme = require('../validations/order');
const feedbackScheme = require('../validations/feedback');
const auth = require('../middlewares/auth');

router.post('/', auth.isUser, validate(orderScheme.create), ordersController.createOrder);
router.post('/:id/feedback', auth.isUser, validate(feedbackScheme.create), ordersController.createFeedback);
router.delete('/:id', auth.isUser, ordersController.cancelOrder);
router.patch('/:id', auth.isDriver, ordersController.closeOrder);
router.patch('/:id/accept', auth.isDriver, ordersController.acceptOrder);
router.get('/', auth.isAdmin, ordersController.getAllOrdersWithUsers);
router.get('/history', auth.isUser, ordersController.getAllOrdersOfUser);
router.get('/:id', auth.isUser, ordersController.getOrderById);

module.exports = router;