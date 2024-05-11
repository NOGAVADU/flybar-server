require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const models = require("./models/models");
const cors = require("cors");
const fileUpload = require('express-fileupload')
const router = require("./routes/index");
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path');

const PORT = process.env.PORT || 5000;

const app = express();
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Разрешить запросы со всех доменов
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Разрешить различные HTTP методы
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Разрешить различные заголовки
    next();
});
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)

app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
};

start();
