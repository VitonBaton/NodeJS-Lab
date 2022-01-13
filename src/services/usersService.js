const usersRepository = require("../repositories/usersRepository");
const usersInfoRepository = require("../repositories/usersInfoRepository");
const bcrypt = require("bcrypt");
const constants = require('../utils/constants');
const { roles } = require("../utils/constants");
const ForbiddenError = require("../errors/forbiddenError");
const NotFoundError = require("../errors/notFoundError");


class UsersService {

    async findByLogin(login) {
        const result = await usersRepository.findOne({ where: { login: login } });
        return result;
    }

    async createUser(userData) {

        if (userData.role == roles.driver) {
            throw new ForbiddenError('Forbidden. Use special method for drivers');
        }

        const password = userData.password;

        await bcrypt.hash(password, 10)
            .then((hash) => { userData.password = hash; });

        const result = await usersRepository.create(userData);

        try {
            const info = await usersInfoRepository.create({ userId: result.id, email: userData.email });
        } catch (err) {
            await usersRepository.deleteById(result.id);
            throw err;
        }

        return result;
    }

    async getUser(userId) {
        const result = await usersRepository.findById(userId);
        if (result === null) {
            throw new NotFoundError("User not found");
        }
        return result;
    }

    async setRole(userId, role) {
        const user = await usersRepository.findById(userId);
        if (user === null) {
            throw new NotFoundError("User not found");
        }

        if (role == roles.driver) {
            throw new ForbiddenError('Forbidden. Use special method for drivers');
        }

        user.role = role;
        await usersRepository.update(user);
        return user;
    }

    // async updateUser(userId, newUser) {
    //     const user = await usersRepository.findById(userId);
    //     for (let key in newUser) {
    //         user[key] = newUser[key];
    //     }
    //     await usersRepository.update(user);
    // }

    async deleteUser(userId) {
        const result = await usersRepository.deleteById(userId);
        return result;
    }

    async freezeUser(userId) {
        const user = await usersRepository.findById(userId);
        if (user === null) {
            throw new NotFoundError("User not found");
        }
        user.isActive = !user.isActive;
        await usersRepository.update(user);
    }

    async getAllUsers() {
        const result = await usersRepository.findAll();
        return result;
    }

    async getUserInfo(userId) {
        const result = await usersInfoRepository.findOne({ where: { userId: userId } });
        if (!result) {
            throw new NotFoundError('Info about this user not found');
        }
        return result;
    }

    async changePassword(userId, oldPassword, newPassword) {
        const user = await usersRepository.findById(userId);
        const match = await bcrypt.compare(oldPassword, user.password);
        if (match) {
            await bcrypt.hash(newPassword, 10)
                .then((hash) => { user.password = hash; });
            await usersRepository.update(user);
        } else {
            throw new ForbiddenError("Incorrect password");
        }
        return user;
    }

    async updateUserInfo(userId, newInfo) {
        const info = await usersInfoRepository.findOne({ where: { userId: userId } });
        if (!info) {
            throw new NotFoundError("Info about this user not found");
        }
        for (let key in newInfo) {
            info[key] = newInfo[key];
        }
        await usersInfoRepository.update(info);
        return info;
    }
}

module.exports = new UsersService();