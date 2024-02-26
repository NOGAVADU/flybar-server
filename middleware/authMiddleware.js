const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    if ((req.method = "OPTIONS")) {
        next();
    }

    try {
        const token = req.headers.authorization.split(" ")[1];
        if (token == 'null') {
            return res.status(401);
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.admin = decoded;
        next();
    } catch (e) {
        return res.status(401);
    }
};
