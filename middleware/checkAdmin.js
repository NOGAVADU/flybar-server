const jwt = require('jsonwebtoken')

module.exports = function () {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next();
        }

        try {
            const token = req.headers.authorization.split(" ")[1];
            if (!token) {
                return res.satus(401).json({message: "Не авторизован"});
            }
            req.admin = jwt.verify(token, process.env.SECRET_KEY);
            console.log(req.admin)
            next();
        } catch (e) {
            res.status(401).json({message: "Не авторизован/ошибка", error: e});
        }
    }
}