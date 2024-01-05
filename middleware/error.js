const ErrorHandler = require("../utils/errorHandler.js")

const ErroThrow = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // wrong mongodb error
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid : ${err.path}`
        err = new ErrorHandler(message, 400)
    }

    // MOngoose dublicate key error
    if (err.code === 11000) {
        const message = `Dublicate ${Object.keys(err.keyValue)} Entered`
        err = new ErrorHandler(message, 400)
    }

    // Wrong JWT error
    if (err.name === "jsonWebTokenError") {
        const message = `Json web token is invalid, try again `
        err = new ErrorHandler(message, 400)
    }
    // JWT expire error
    if (err.name === "TokenExpiredErrir") {
        const message = `Json web token is Expired, try again `
        err = new ErrorHandler(message, 400)
    }


    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    })
}

module.exports = ErroThrow