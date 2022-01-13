const express = require('express');
const router = express.Router();
const driversController = require('../controllers/driversController');
const validate = require('../middlewares/validate');
const driverScheme = require('../validations/driver');
const carScheme = require('../validations/car');
const auth = require('../middlewares/auth');

router.get('/feedbacks', auth.isDriver, driversController.getFeedbacks);
router.post('/', auth.isAdmin, validate(driverScheme.create), driversController.createDriver);
router.post('/cars', auth.isAdmin, validate(carScheme.create), driversController.createCar);
router.delete('/cars/:id', auth.isAdmin, driversController.deleteCarById);
router.patch('/:id/car', auth.isAdmin, validate(driverScheme.changeCar), driversController.changeCar);
router.get('/', auth.isUser, driversController.getAllDrivers);
router.get('/cars', auth.isAdmin, driversController.getAllCars);
router.get('/comforts/', auth.isUser, driversController.getComforts);
router.get('/:id', auth.isUser, driversController.getDriverById);
router.get('/cars/:id', auth.isUser, driversController.getCarById);
router.get('/comforts/:id/drivers', auth.isUser, driversController.getDriversForComfort);


module.exports = router;