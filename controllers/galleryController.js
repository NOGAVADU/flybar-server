const {Gallery} = require("../models/models");
const uuid = require("uuid");
const path = require("path");

class PortfolioController {
    async create(req, res) {
        const {name, portfolioTypeId} = req.body;
        const {img} = req.files;
        let fileName = uuid.v4() + ".jpg";
        img.mv(path.resolve(__dirname, "..", "static", fileName));

        const gallery = await Gallery.create({
            name,
            portfolioTypeId,
            img: fileName,
        });

        return res.json(gallery);
    }

    async delete(req, res) {
        const {id} = req.body;
        const gallery = Gallery.destroy({where: {id: id}})
        return res.json(gallery);
    }

    async getAll(req, res) {
        let {portfolioTypeId} = req.query;
        let galleries;
        if (portfolioTypeId) {
            galleries = await Gallery.findAll({where: {portfolioTypeId}});
        } else {
            galleries = await Gallery.findAll();

        }
        return res.json(galleries);
    }

    async getOne(req, res) {
        const {id} = req.params;
        const gallery = await Gallery.findOne({where: {id}});
        return res.json(gallery);
    }
}

module.exports = new PortfolioController();
