const passport = require('passport');
const jwt = require('jsonwebtoken');
const usersService = require('../services/usersService');
const env = require('../env');


class LoginController {

    // async login(req, res, next) {
    //     try {
    //         console.log('in login');
    //         await passport.authenticate('login', async(err, user, info) => {
    //             console.log("in login auth");
    //             if (err || !user) {
    //                 return next(new Error('An error occured'));
    //             }
    //             req.login(
    //                 user, { session: false },
    //                 async(error) => {
    //                     if (error) {
    //                         return next(error);
    //                     }
    //                     const body = {
    //                         id: user.id,
    //                         login: user.login,
    //                         role: user.role
    //                     };
    //                     const token = jwt.sign({ user: body }, env.secretKey);
    //                     return res.send(200).json({ token });
    //                 }
    //             );
    //         });
    //     } catch (err) {
    //         next(err);
    //     }
    // }

    async login(req, res, next) {
        try {
            const body = {
                id: req.user.id,
                login: req.user.login,
                role: req.user.role
            };
            const token = jwt.sign({ user: body }, env.secretKey, { expiresIn: '24h' });
            return res.status(200).send({ token: token });
        } catch (err) {
            next(err);
        }
    }

    async signUp(req, res, next) {
        try {
            const userData = req.body;
            //await usersService.createUser(userData).then((result) => { res.status(201).send({ id: result.id }) });
            const result = await usersService.createUser(userData);
            //req.id = result.id;
            //res.status(201).send({ id: result.id });
            await res.delegate('mailer');
        } catch (err) {
            return next(err);
        }
    }
}

module.exports = new LoginController();