const { PortfolioType, Gallery, Type} = require("../models/models");
const ApiError = require("../error/ApiError");
const uuid = require("uuid");
const path = require("path");

class PortfolioController {
    async create(req, res) {
        const { name } = req.body;
        const { img } = req.files;
        let fileName = uuid.v4() + ".jpg";
        img.mv(path.resolve(__dirname, "..", "static", fileName));

        const portfolioType = await PortfolioType.create({
            name,
            img: fileName,
        });

        return res.json(portfolioType);
    }
    async delete(req, res) {
        console.log(req.body)
        const { id } = req.body;
        const type = await PortfolioType.destroy({ where: { id: id } });
        return res.json(type)
    }

    async getAll(req, res) {
        const portfolioTypes = await PortfolioType.findAll({
            include: [{ model: Gallery}],
        });
        return res.json(portfolioTypes);
    }

    async getOne(req, res) {
        const { id } = req.params;
        const portfolioType = await PortfolioType.findOne({ where: { id } });
        return res.json(portfolioType);
    }
}

module.exports = new PortfolioController();
