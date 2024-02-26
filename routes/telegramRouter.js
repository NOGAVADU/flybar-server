const Router = require('express')
const router = new Router()
const telegramController = require('../controllers/telegramController')

router.post('/order', telegramController.sendOrder)
router.post('/callback', telegramController.sendCallback)

module.exports = router