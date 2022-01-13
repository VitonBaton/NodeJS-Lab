const carsRepository = require("../repositories/carsRepository");
const comfortsRepository = require("../repositories/comfortsRepository");
const ordersRepository = require("../repositories/ordersRepository");
const feedbacksRepository = require("../repositories/feedbacksRepository");
const driversRepository = require("../repositories/driversRepository");
const usersRepository = require('../repositories/usersRepository');
const roles = require('../utils/constants').roles;
const { user } = require("pg/lib/defaults");
const NotFoundError = require("../errors/notFoundError");

class DriversService {
    async getComforts() {
        const result = await comfortsRepository.findAll();
        return result;
    }
    async createCar(car) {
        const result = await carsRepository.create(car);
        return result;
    }

    async getAllCars() {
        const result = await carsRepository.findAll();
        return result;
    }
    async createDriver(userId, carId) {

        const user = await usersRepository.findById(userId);
        if (!user) {
            throw new NotFoundError('User not found');
        }
        const car = await carsRepository.findById(carId);
        if (!car) {
            throw new NotFoundError('Car not found');
        }

        user.role = roles.driver;
        await usersRepository.update(user);

        const result = await driversRepository.create({
            userId: userId,
            carId: carId
        });
        return result;
    }

    async getAllDrivers() {
        const result = await driversRepository.findAll();
        return result;
    }

    async getDriverById(driverId) {
        const result = await driversRepository.findById(driverId);
        if (!result) {
            throw new NotFoundError('Driver not found');
        }
        return result;
    }

    async getCarById(carId) {
        const result = await carsRepository.findById(carId);
        if (!result) {
            throw new NotFoundError('Car not found');
        }
        return result;
    }

    async getDriversForComfort(comfortId) {
        const comfort = await comfortsRepository.findById(comfortId);
        if (!comfort) {
            throw new NotFoundError('Comfort type not found');
        }
        const result = await driversRepository.getDriversForComfort(comfortId);
        return result;
    }

    async getFeedbacks(driverId) {
        const driver = await driversRepository.findById(driverId);
        if (!driver) {
            throw new NotFoundError('Driver not found');
        }
        const result = await feedbacksRepository.getFeedbacks(driverId);
        return result;
    }

    async changeCar(driverId, carId) {
        const driver = await driversRepository.findById(driverId);
        if (!driver) {
            throw new NotFoundError('Driver not found');
        }
        driver.carId = carId;
        await driversRepository.update(driver);
        return driver;
    }

    async deleteCar(carId) {
        const result = await carsRepository.deleteById(carId);
        if (result === 0) {
            throw new NotFoundError('Car not found');
        }
    }
}

module.exports = new DriversService();