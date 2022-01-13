//const usersModel = require("../models/users");

class GenericRepository {

    constructor(model) {
        this._model = model;
    }

    async create(object) {
        const result = await this._model.create(object);
        return result;
    }

    async findAll() {
        const result = await this._model.findAll();
        return result;
    }

    async findById(id) {
        const result = await this._model.findByPk(id);
        return result;
    }

    async findByQuery(query) {
        const result = await this._model.findAll(query);
        return result;
    }

    async findOne(query) {
        const result = await this._model.findOne(query);
        return result;
    }

    async update(object) {
        await object.save();
    }

    async deleteById(id) {
        const result = await this._model.destroy({ where: { id } });
        return result;
    }
}

module.exports = GenericRepository;