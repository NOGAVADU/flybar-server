const { Admin } = require("../models/models");
const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateJwt = (id, name) => {
    return jwt.sign({ id, name }, process.env.SECRET_KEY, {
        expiresIn: "24h",
    });
};

class AdminController {
    async create(req, res) {
        const { name, password } = req.body;
        const hashPassword = await bcrypt.hash(password, 5);
        const admin = await Admin.create({ name, password: hashPassword });
        const token = generateJwt(admin.id, admin.name);
        return res.json({ token });
    }

    async login(req, res, next) {
        const { name, password } = req.body;
        const admin = await Admin.findOne({ where: { name } });
        if (!admin) {
            return next(ApiError.internal("Админа с таким именем не найдено"));
        }

        let comparePassword = bcrypt.compareSync(password, admin.password);
        if (!comparePassword) {
            return next(ApiError.badRequest("Указан неверный пароль"));
        }

        const token = generateJwt(admin.id, admin.name);
        return res.json({ token });
    }

    async check(req, res, next) {
        setTimeout(() => {
            const token = generateJwt(req.admin.id, req.admin.name);
            return res.json({ token });
        }, 0);
    }
}

module.exports = new AdminController();
