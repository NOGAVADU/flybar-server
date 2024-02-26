const Router = require('express')
const router = new Router()
const serviceTypeController = require('../controllers/serviceTypeController')
const checkAdmin = require('../middleware/checkAdmin')

router.post('/', checkAdmin(), serviceTypeController.create)
router.delete('/', checkAdmin(), serviceTypeController.clearAll)

module.exports = router