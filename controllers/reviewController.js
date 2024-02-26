const {Review} = require("../models/models")
const ApiError = require('../error/ApiError')
const uuid = require("uuid");
const path = require("path");

class ReviewController {
    async create(req, res) {
        const {name, event_name = '', review_body = ''} = req.body
        const {img} = req.files;
        let fileName = uuid.v4() + ".jpg";
        img.mv(path.resolve(__dirname, "..", "static", fileName));

        const review = await Review.create({name, event_name, review_body, img: fileName})
        return res.json(review)
    }

    async getAll(req, res) {
        const reviews = await Review.findAll()
        return res.json(reviews)
    }

    async delete(req, res) {
        const {id} = req.body
        await Review.destroy({where: {id: id}})
        return res.json("Успешно удалено")
    }

    async getOne(req, res) {
        const {id} = req.params
        const review = await Review.findOne({where: {id}})
        return res.json(review)
    }
}

module.exports = new ReviewController()