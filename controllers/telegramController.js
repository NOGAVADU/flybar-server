const ApiError = require("../error/ApiError");
// const http = require("http");
const http = require('request')

class telegramController {
    async sendOrder(req, res) {
        const {name, phone, mail, order} = req.body
        const fields = [
            `Имя заказчика: ${name}`,
            `Телефон заказчика: ${phone}`,
            `Почта заказчика: ${mail}`,
            `Тело заказа: ${order}`
        ]
        let msg = '=ЗАЯВКА НА ОФОРМЛЕНИЯ ЗАКАЗА=\n'
        fields.forEach(field => {
            msg += field + '\n'
        })

        msg = encodeURI(msg)
        http.post(`https://api.telegram.org/bot${process.env.TG_BOT_TOKEN}/sendMessage?chat_id=${process.env.TG_CHAT_ID}&parse_mode=html&text=${msg}`, function (error, response, body) {
            console.log('error:', error);
            console.log('statusCode:', response && response.statusCode);
            console.log('body:', body);
            if (response.statusCode === 200) {
                res.status(200).json({status: 'ok', message: 'Успешно отправлено!'});
            }
            if (response.statusCode !== 200) {
                res.status(400).json({status: 'error', message: 'Произошла ошибка!'});
            }
        });
    }

    async sendCallback(req, res) {
        const {name, phone} = req.body;
        const fields = [
            `Имя заказчика: ${name}`,
            `Номер телефона заказчика: ${phone}`
        ]

        let msg = '=ЗАЯВКА НА ОБРАТНЫЙ ЗВОНОК=\n'
        fields.forEach(field => {
            msg += field + '\n'
        })

        msg = encodeURI(msg)

        http.post(`https://api.telegram.org/bot${process.env.TG_BOT_TOKEN}/sendMessage?chat_id=${process.env.TG_CHAT_ID}&parse_mode=html&text=${msg}`, function (error, response, body) {
            console.log('error:', error);
            console.log('statusCode:', response && response.statusCode);
            console.log('body:', body);
            if (response.statusCode === 200) {
                res.status(200).json({status: 'ok', message: 'Успешно отправлено!'});
            }
            if (response.statusCode !== 200) {
                res.status(400).json({status: 'error', message: 'Произошла ошибка!'});
            }
        });
    }
}

module.exports = new telegramController();
