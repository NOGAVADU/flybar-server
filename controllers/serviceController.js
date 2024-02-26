const {
    Service,
    ServiceInfo,
    ServicePrice,
    Type,
} = require("../models/models");
const ApiError = require("../error/ApiError");
const uuid = require("uuid");
const path = require("path");

class ServiceController {
    async create(req, res, next) {
        try {
            let { name, service_body, price, info } = req.body;
            const { img } = req.files;
            let fileName = uuid.v4() + ".jpg";
            img.mv(path.resolve(__dirname, "..", "static", fileName));

            const service = await Service.create({
                name,
                service_body,
                price,
                img: fileName,
            });

            if (info) {
                info = JSON.parse(info);
                info.forEach((i) => {
                    ServiceInfo.create({
                        title: i.title,
                        description: i.description,
                        serviceId: service.id,
                    });
                });
            }

            if (price) {
                price = JSON.parse(price);
                price.forEach((i) => {
                    ServicePrice.create({
                        amount: i.amount,
                        type: i.type,
                        price: i.price,
                        serviceId: service.id,
                    });
                });
            }

            return res.json(service);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        const services = await Service.findAll();
        return res.json(services);
    }

    async getOne(req, res) {
        const { id } = req.params;
        const service = await Service.findOne({
            where: { id },
            include: [
                { model: ServiceInfo, as: "info" },
                { model: ServicePrice, as: "price" },
            ],
        });
        return res.json(service);
    }

    async deleteOne(req, res) {
        const { id } = req.body;
        const service = await Service.destroy({ where: { id: id } });
        return res.json(service);
    }

    async editOne(req, res) {
        const { id, title, description, price } = req.body;
        const type = await Type.update(
            { name: title, service_body: description, price: price },
            { where: { id } }
        );
        return res.json(type);
    }

    async getOneServiceInfo(req, res) {
        const { id } = req.params;
        const info = await Service.findOne({
            where: { id },
            include: [{ model: ServiceInfo, as: "info" }],
        });
        return res.json(service);
    }
}

module.exports = new ServiceController();
