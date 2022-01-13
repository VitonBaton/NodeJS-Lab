const driversService = require('../services/driversService');

class DriversController {
    async createCar(req, res, next) {
        try {
            const carData = req.body;
            await driversService.createCar(carData).then((result) => { res.status(201).send({ id: result.id }) });
        } catch (err) {
            return next(err);
        }
    }
    async createDriver(req, res, next) {
        try {
            await driversService
                .createDriver(req.body.userId, req.body.carId)
                .then((result) => { res.status(201).send({ id: result.id }) });
        } catch (err) {
            return next(err);
        }
    }
    async getAllDrivers(req, res, next) {
        try {
            await driversService.getAllDrivers().then((result) => { res.status(200).send(result) });
        } catch (err) {
            return next(err);
        }
    }
    async getDriverById(req, res, next) {
        try {
            const driverId = req.params.id;
            await driversService.getDriverById(driverId).then((result) => { res.status(200).send(result) });
        } catch (err) {
            return next(err);
        }
    }
    async getCarById(req, res, next) {
        try {
            const carId = req.params.id;
            await driversService.getCarById(carId).then((result) => { res.status(200).send(result) });
        } catch (err) {
            return next(err);
        }
    }
    async deleteCarById(req, res, next) {
        try {
            const carId = req.params.id;
            await driversService.deleteCar(carId).then((result) => { res.status(200).send('Car successfully deleted') });
        } catch (err) {
            return next(err);
        }
    }
    async getAllCars(req, res, next) {
        try {
            await driversService.getAllCars().then((result) => { res.status(200).send(result) });
        } catch (err) {
            return next(err);
        }
    }
    async getComforts(req, res, next) {
        try {
            await driversService.getComforts().then((result) => { res.status(200).send(result) });
        } catch (err) {
            return next(err);
        }
    }
    async getDriversForComfort(req, res, next) {
        try {
            const comfortId = req.params.id;
            await driversService.getDriversForComfort(comfortId).then((result) => { res.status(200).send(result) });
        } catch (err) {
            return next(err);
        }
    }
    async getFeedbacks(req, res, next) {
        try {
            const driverId = req.user.id;
            await driversService.getFeedbacks(driverId).then((result) => { res.status(200).send(result) });
        } catch (err) {
            return next(err);
        }
    }

    async changeCar(req, res, next) {
        try {
            const driverId = req.params.id;
            const carId = req.body.carId;
            await driversService.changeCar(driverId, carId).then((result) => { res.status(200).send(result) });
        } catch (err) {
            return next(err);
        }
    }

    // async findCar(req, res, next) {
    //     try {
    //         const stateNumber = req.body.stateNumber;
    //         await driversService.findCarByStateNumber(stateNumber).then((result) => { res.status(200).send(result) });
    //     } catch (err) {
    //         return next(err);
    //     }
    // }
}

module.exports = new DriversController();