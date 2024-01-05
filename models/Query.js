const mongoose = require("mongoose")
const validator = require("validator")
const querySchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Please Enter your Name'],
        maxLength: [30, 'Name cannot exceed 30 characters'],
        minLength: [4, "Name should have more than 4 characters"]
    },
    email: {
        type: String,
        required: [true, "Please Enter your email"],
        validate: [validator.isEmail, "Please Enter a valid Email",]
    },
    contactNo: {
        type: String,
        required: [true, "Please Enter your Contact Number"],
    },
    message: {
        type: String,
        required: [true, "Please Enter your Query"]
    },
    condition: {
        type: String,
        default: "Pending",
    }

})

module.exports = mongoose.model('Query', querySchema)
