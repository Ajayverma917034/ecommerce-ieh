const tryCatch = require('../controllers/utils/tryCatch.js')
const ErrorHandler = require('../utils/errorHandler.js')
const User1 = require("../models/UserModel.js")
const jwt = require("jsonwebtoken")

exports.isAuthentication = tryCatch(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return next(new ErrorHandler("Please login to this resource", 401));
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User1.findById(decodedData.id)

    next();
})

exports.authorizeroles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorHandler(`Role : ${req.user.role} is not allowed to access this resource`, 403))
        }
        next();
    }
}

