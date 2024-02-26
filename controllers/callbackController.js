const {Callback} = require("../models/models")
const ApiError = require('../error/ApiError')

class CallbackController {
    async create (req, res) {
        const {name, phone} = req.body;
        const callback = await Callback.create({name, phone})
        return res.json(callback)
    }

}

module.exports = new CallbackController()