const { Service, Type, ServiceType } = require("../models/models");
const ApiError = require("../error/ApiError");

class ServiceTypeController {
    async create(req, res) {
        const { serviceId, typeId } = req.body;
        const service = await Service.findOne({ where: { id: serviceId } });
        const type = await Type.findOne({ where: { id: typeId } });
        const serviceType = await type.addService(service);
        return res.json(serviceType);
    }

    async clearAll(req, res) {
        const { id } = req.body;
        console.log(id);
        const type = await ServiceType.destroy({ where: { typeId: id } });
        return res.json(type);
    }
}

module.exports = new ServiceTypeController();
