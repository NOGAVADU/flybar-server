const Router = require('express')
const router = new Router()
const typeController = require('../controllers/typeController')
const checkAdmin = require('../middleware/checkAdmin')

router.post('/', checkAdmin(), typeController.create)
router.get('/', typeController.getAll)
router.put('/', checkAdmin(), typeController.editOne)
router.delete('/', checkAdmin(), typeController.deleteOne)

module.exports = router