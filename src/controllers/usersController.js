const passport = require('passport');
const jwt = require('jsonwebtoken');
const usersService = require('../services/usersService');
const env = require('../env');


class UsersController {

    async createUser(req, res, next) {
        try {
            const userData = req.body;
            await usersService.createUser(userData).then((result) => { res.status(201).send({ id: result.id }) });
            //res.json(new Response("Registration successfull", 200));
        } catch (err) {
            return next(err);
        }
    }
    async getAllUsers(req, res, next) {
        try {
            await usersService.getAllUsers().then((result) => { res.status(200).send(result) });
        } catch (err) {
            return next(err);
        }
    }
    async getUserById(req, res, next) {
        try {
            const userId = req.params.id;
            await usersService.getUser(userId).then((result) => { res.status(200).send(result) });
        } catch (err) {
            return next(err);
        }
    }
    async getUserInfoById(req, res, next) {
        try {
            const userId = req.user.id;
            await usersService.getUserInfo(userId).then((result) => { res.status(200).send(result) });
        } catch (err) {
            return next(err);
        }
    }
    async updateUserInfoById(req, res, next) {
        try {
            const userId = req.user.id;
            const newInfo = req.body;
            await usersService.updateUserInfo(userId, newInfo).then((result) => { res.status(200).send(result) });
        } catch (err) {
            return next(err);
        }
    }
    async changeUserPassword(req, res, next) {
        try {
            const userId = req.user.id;
            const oldPassword = req.body.oldPassword;
            const newPassword = req.body.newPassword;
            await usersService.changePassword(userId, oldPassword, newPassword).then((result) => { res.status(200).send(result) });
        } catch (err) {
            return next(err);
        }
    }
    async deleteUserById(req, res, next) {
        try {
            const userId = req.params.id;
            await usersService.deleteUser(userId).then((result) => { res.status(200).send('User succsessfully deleted') });
        } catch (err) {
            return next(err);
        }
    }
    async freezeUserById(req, res, next) {
        try {
            const userId = req.params.id;
            await usersService.freezeUser(userId).then((result) => { res.status(200).send("User active status has changed") });
        } catch (err) {
            return next(err);
        }
    }
    async setUserRole(req, res, next) {
        try {
            const userId = req.params.id;
            const role = req.body.role;
            await usersService.setRole(userId, role).then((result) => { res.status(200).send(result); });
        } catch (err) {
            return next(err);
        }
    }
}

module.exports = new UsersController();