const {Client} = require("../models/models");
const uuid = require("uuid");
const path = require("path");

class ClientsController {
    async create(req, res) {
        const {name} = req.body;
        const {img} = req.files;
        let fileName = uuid.v4() + ".jpg";
        img.mv(path.resolve(__dirname, "..", "static", fileName));

        const client = await Client.create({
            name,
            img: fileName,
        });

        return res.json(client);
    }

    async getAll(req, res) {
        const clients = await Client.findAll()
        return res.json(clients);
    }

    async delete(req, res) {
        const {id} = req.body
        await Client.destroy({where: {id: id}})
        return res.json("Успешно удалено");
    }

}

module.exports = new ClientsController();
