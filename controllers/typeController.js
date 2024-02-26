const { Type, Service } = require("../models/models");
const ApiError = require("../error/ApiError");

class typeController {
    async create(req, res) {
        const { title, description } = req.body;
        const type = await Type.create({ title, description });
        return res.json(type);
    }

    async getAll(req, res) {
        const types = await Type.findAll({ include: Service });
        return res.json(types);
    }

    async editOne(req, res) {
        const { id, title, description } = req.body;
        const type = await Type.update(
            { title: title, description: description },
            { where: { id } }
        );
        return res.json(type);
    }

    async deleteOne(req, res) {
        const { id } = req.body;
        const type = await Type.destroy({ where: { id: id } });
        return res.json(type);
    }
}

module.exports = new typeController();
