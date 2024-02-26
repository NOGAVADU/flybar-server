const Router = require("express");
const router = new Router();
const portfolioController = require("../controllers/portfolioController");
const checkAdmin = require('../middleware/checkAdmin')

router.post("/", checkAdmin(), portfolioController.create);
router.delete("/", checkAdmin(), portfolioController.delete);
router.get("/", portfolioController.getAll);
router.get("/:id", portfolioController.getOne);

module.exports = router;
