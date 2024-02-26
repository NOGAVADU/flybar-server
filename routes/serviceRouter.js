const Router = require("express");
const router = new Router();
const serviceController = require("../controllers/serviceController");
const checkAdmin = require('../middleware/checkAdmin')

router.post("/",checkAdmin(), serviceController.create);
router.get("/", serviceController.getAll);
router.get("/:id", serviceController.getOne);
router.delete("/", checkAdmin(), serviceController.deleteOne);
router.put("/", checkAdmin(), serviceController.editOne);

module.exports = router;
