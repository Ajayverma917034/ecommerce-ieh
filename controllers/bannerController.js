const tryCatch = require("./utils/tryCatch")
const cloudinary = require("cloudinary");
const Banner = require("../models/BannerModel");
const ErrorHandler = require("../utils/errorHandler");


exports.addBanner = tryCatch(async (req, res, next) => {
    const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
        folder: 'banners',
    });
    const banner = await Banner.create({
        image: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        }
    })
    res.status(201).json({ success: true, banner })
})

exports.getAllBanner = tryCatch(async (req, res, next) => {
    const banner = await Banner.find();
    res.status(200).json({ success: true, banner })
})

exports.deleteBanner = tryCatch(async (req, res, next) => {
    const banner = await Banner.findById(req.params.id);
    if (!banner) {
        return next(new ErrorHandler(`Banner does not find by ${req.params.id}`))
    }
    res.send(200).json({ success: true, message: "Banner deleted successfully" })
})