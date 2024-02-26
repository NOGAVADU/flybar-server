const Router = require('express')
const router = new Router()
const clientsController = require('../controllers/clientsController')
const checkAdmin = require('../middleware/checkAdmin')

router.post('/',checkAdmin(), clientsController.create)
router.delete('/',checkAdmin(), clientsController.delete)
router.get('/', clientsController.getAll)

module.exports = router