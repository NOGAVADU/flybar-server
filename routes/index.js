const Router = require("express");
const router = new Router();

const adminRouter = require("./adminRouter");
const reviewRouter = require("./reviewRouter");
const clientRouter = require("./clientRouter");
const callbackRouter = require("./callbackRouter");
const serviceRouter = require("./serviceRouter");
const serviceTypeRouter = require("./serviceTypeRouter");
const typeRouter = require("./typeRouter");
const orderRouter = require("./orderRouter");
const portfolioTypeRouter = require("./portfolioTypeRouter");
const typeGalleryRouter = require("./typeGalleryRouter");
const galleryPhotoRouter = require("./galleryPhotoRouter");
const telegramRouter = require('./telegramRouter')

router.use("/service", serviceRouter);
router.use("/type", typeRouter);
router.use("/servicetype", serviceTypeRouter);
router.use("/portfoliotype", portfolioTypeRouter);
router.use("/typegallery", typeGalleryRouter);
router.use("/galleryphoto", galleryPhotoRouter);
router.use("/review", reviewRouter);
router.use("/callback", callbackRouter);
router.use("/order", orderRouter);
router.use("/client", clientRouter);
router.use("/admin", adminRouter);
router.use("/telegram", telegramRouter);

module.exports = router;
