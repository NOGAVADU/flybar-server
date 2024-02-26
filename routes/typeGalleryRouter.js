const Router = require("express");
const router = new Router();
const galleryController = require("../controllers/galleryController");
const checkAdmin = require('../middleware/checkAdmin')

router.post("/", checkAdmin(), galleryController.create);
router.delete("/", checkAdmin(), galleryController.delete);
router.get("/", galleryController.getAll);
router.get("/:id", galleryController.getOne);

module.exports = router;
