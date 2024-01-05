const ApiFeatures = require("../middleware/apiFeature.js")
const Product = require("../models/ProductData.js")
const ErrorHandler = require("../utils/errorHandler.js")
const tryCatch = require("./utils/tryCatch.js")
const cloudinary = require("cloudinary")

// creating product
exports.createProduct = tryCatch(async (req, res, next) => {

    let images = [];

    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "products",
        });

        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
        });
    }

    req.body.images = imagesLinks;

    req.body.user = req.user.id;
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
})
// to get all the data

exports.getAllProducts = tryCatch(async (req, res, next) => {
    const resultPerPage = 8;
    const productsCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(), req.query).search().filter()

    let products = await apiFeature.query;
    let filteredProductCount = products.length;
    apiFeature.pagination(resultPerPage)
    products = await apiFeature.query.clone()

    res.status(200).json({
        success: true,
        products,
        productsCount,
        resultPerPage,
        filteredProductCount
    })
})
exports.getAllProductsPaginated = tryCatch(async (req, res, next) => {


    const apiFeature = new ApiFeatures(Product.find(), req.query).search()


    const products = await apiFeature.query;
    res.status(200).json({
        success: true,
        products,

    })
})
// to get the details of any product

exports.productDetails = tryCatch(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product not found", 404))
    }

    res.status(200).json({
        success: true,
        product
    })
})




// to update product by product id --Admin

exports.updateProduct = tryCatch(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        next(new ErrorHandler("Product Not found", 404))
    }

    // Images Start Here
    let images = [];

    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    }

    if (images !== undefined) {
        // Deleting Images =require( Cloudinary
        for (let i = 0; i < product.images.length; i++) {
            await cloudinary.v2.uploader.destroy(product.images[i].public_id);
        }

        const imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: "products",
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }

        req.body.images = imagesLinks;
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    res.status(200).json({
        success: true,
        result: product
    })

})

// delete product =require( db -- Admin

exports.deleteProduct = tryCatch(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product not found", 404))
    }
    for (let i = 0; i < product.length; i++) {
        const result = await cloudinary.v2.uploader.destroy(product.images[i].public_id)
    }

    await Product.deleteOne(product)
    res.status(200).json({
        success: true,
        message: "Product has been deleted successfully"
    })
})

// create procut route
exports.createProductReview = tryCatch(async (req, res, next) => {
    const { rating, comment, productId, img_url } = req.body;
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
        img_url,
    };
    const product = await Product.findById(productId);
    const isReviewed = product.reviews.find((rev) => rev.user.toString() === req.user._id.toString())
    if (isReviewed) {
        product.reviews.forEach((rev) => {
            if (rev.user.toString() === req.user._id.toString())
                (rev.rating = rating), (rev.comment = comment);
        });
    }
    else {
        product.reviews.push(review)
        product.numOfReviews = product.reviews.length
    }
    let avg = 0
    product.reviews.forEach((rev) => {
        avg += rev.rating;
    });

    product.ratings = avg / product.reviews.length;
    await product.save({ validateBeforeSave: false });
    res.status(200).json({
        success: true,

    })
})
// get All reviews of a product

exports.getProductReviews = tryCatch(async (req, res, next) => {
    const product = await Product.findById(req.query.id);
    if (!product) {
        return next(new ErrorHandler("Product not found", 404))
    }
    res.status(200).json({
        success: true,
        reviews: product.reviews,
    })
})

// delete reviews
exports.deleteProductReviews = tryCatch(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);
    if (!product) {
        return next(new ErrorHandler("Product not found", 404))
    }
    const reviews = product.reviews.filter(rev => rev._id.toString() !== req.query.id.toString());
    let avg = 0
    reviews.forEach((rev) => {
        avg += rev.rating;
    });

    let ratings = 0;
    if (reviews.length === 0) {
        ratings = 0;
    }
    else {
        ratings = avg / reviews.length;
    }

    const numOfReviews = reviews.length;
    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numOfReviews,
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    })

    res.status(200).json({
        success: true,

    })
})

// GET ALL PRODUCT ADMIN
exports.getAdminProduct = tryCatch(async (req, res, next) => {
    const products = await Product.find();

    res.status(200).json({
        success: true,
        products,
    })
})


