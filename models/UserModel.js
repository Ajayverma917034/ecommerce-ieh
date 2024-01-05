const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Please Enter your Name'],
        maxLength: [30, 'Name cannot exceed 30 characters'],
        minLength: [4, "Name should have more than 4 characters"]
    },
    email: {
        type: String,
        required: [true, "Please Enter your email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a valid Email",]
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minLength: [8, "Password should be greater than 8 characters"],
        select: false,
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: "user",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
})
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

//jwt token
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

// Compare Password

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};
// generating password Reset Token

userSchema.methods.getResetPassToken = async function () {
    // generating token
    const resetToken = crypto.randomBytes(20).toString("hex")
    // hashing and adding to userSchema
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    this.resetPasswordExpire = Date.now() + 15 * 1000 * 30
    return resetToken;
};


const User = mongoose.model('User', userSchema)
module.exports = User;



// const mongoose =require( "mongoose"
// const validator =require( "validator"
// const bcrypt =require( "bcryptjs"
// const jwt =require( "jsonwebtoken"
// const crypto =require( "crypto"
// const userSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         require: [true, 'Please Enter your Name'],
//         maxLength: [30, 'Name cannot exceed 30 characters'],
//         minLength: [4, "Name should have more than 4 characters"]
//     },
//     email: {
//         type: String,
//         required: [true, "Please Enter your email"],
//         unique: true,
//         validate: [validator.isEmail, "Please Enter a valid Email",]
//     },
//     password: {
//         type: String,
//         required: [true, "Please Enter Your Password"],
//         minLength: [8, "Password should be greater than 8 characters"],
//         select: false,
//     },
//     avatar: {
//         public_id: {
//             type: String,
//             required: true
//         },
//         url: {
//             type: String,
//             required: true
//         }
//     },
//     role: {
//         type: String,
//         default: "user",
//     },
//     resetPasswordToken: String,
//     resetPasswordExpire: Date,
// })
// userSchema.pre("save", async function (next) {
//     if (!this.isModified("password")) {
//         next()
//     }
//     this.password = await bcrypt.hash(this.password, 10)
// })

// //jwt token
// userSchema.methods.getJWTToken = function () {
//     return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
//         expiresIn: process.env.JWT_EXPIRE,
//     });
// };

// // Compare Password

// userSchema.methods.comparePassword = async function (password) {
//     return await bcrypt.compare(password, this.password);
// };
// // generating password Reset Token

// userSchema.methods.getResetPassToken = async function () {
//     // generating token
//     const resetToken = crypto.randomBytes(20).toString("hex")
//     // hashing and adding to userSchema
//     this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

//     this.resetPasswordExpire = Date.now() + 15 * 1000 * 30
//     return resetToken;
// };


// const User1 = mongoose.model('user1', userSchema)
// export default User1;