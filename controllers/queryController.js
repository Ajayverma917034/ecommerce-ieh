const Query = require("../models/Query.js")
const ErrorHandler = require("../utils/errorHandler.js")
const tryCatch = require("./utils/tryCatch.js")




exports.newQuery = tryCatch(async (req, res, next) => {
    const { name, email, contactNo, message } = req.body;
    const query = await Query.create({
        name, email, contactNo, message
    })
    res.status(200).json({ success: true, message: 'Your Query Submitted, Thankyou' })
})

exports.getAllQuery = tryCatch(async (req, res, next) => {
    const query = await Query.find()
    res.status(200).json({ success: true, query })
})

exports.getQuery = tryCatch(async (req, res, next) => {
    const query = await Query.findById(req.params.id)
    if (!query)
        return next(new ErrorHandler("Query not found with given id", 404))
    res.status(200).json({ success: true, query })
})


exports.deleteQuery = tryCatch(async (req, res, next) => {
    const query = await Query.findById(req.params.id)
    if (!query) {
        return next(new ErrorHandler("Query Not found", 404))
    }
    await Query.deleteOne(query)
    res.status(200).json({ success: true })
})



exports.updateQueryStatus = tryCatch(async (req, res, next) => {
    const query = await Query.findById(req.params.id);

    if (!query) {
        return next(new ErrorHandler("Querry not found with this Id", 404));
    }

    if (query.condition === "Finished") {
        return next(new ErrorHandler("You have already deal with this query", 400));
    }
    query.condition = req.body.condition;
    console.log(query)
    await query.save({ validateBeforeSave: false });
    res.status(200).json({
        success: true,
    });
});
