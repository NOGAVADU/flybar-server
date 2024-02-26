const Router = require("express");
const router = new Router();
const galleryPhotoController = require("../controllers/galleryPhotoController");
const checkAdmin = require('../middleware/checkAdmin')

router.post("/",checkAdmin(), galleryPhotoController.create);
router.get("/", galleryPhotoController.getAll);
router.get("/:id", galleryPhotoController.getOne);

module.exports = router;
