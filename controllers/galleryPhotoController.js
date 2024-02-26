const { GalleryPhoto } = require("../models/models");
const ApiError = require("../error/ApiError");
const uuid = require("uuid");
const path = require("path");

class GalleryPhotoController {
    async create(req, res) {
        const { galleryId } = req.body;
        const { img } = req.files;
        let fileName = uuid.v4() + ".jpg";
        img.mv(path.resolve(__dirname, "..", "static", fileName));

        const galleryPhoto = await GalleryPhoto.create({
            galleryId,
            img: fileName,
        });

        return res.json(galleryPhoto);
    }

    async getAll(req, res) {
        let { galleryId } = req.query;
        
        let photos;
        if (galleryId) {
            photos = await GalleryPhoto.findAll({ where: { galleryId } });
        } else {
            photos = await GalleryPhoto.findAll();
        }
        return res.json(photos);
    }

    async getOne(req, res) {
        const { id } = req.params;
        const galleryPhoto = await GalleryPhoto.findOne({ where: { id } });
        return res.json(galleryPhoto);
    }
}

module.exports = new GalleryPhotoController();
