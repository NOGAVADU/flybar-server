const Router = require('express')
const router = new Router()
const reviewController = require('../controllers/reviewController')
const checkAdmin = require('../middleware/checkAdmin')

router.post('/',checkAdmin(), reviewController.create)
router.delete('/',checkAdmin(), reviewController.delete)
router.get('/', reviewController.getAll)
router.get('/:id', reviewController.getOne)

module.exports = router