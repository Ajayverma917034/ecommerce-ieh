// import mongoose from "mongoose";

// const productSchema1 = new mongoose.Schema({
//     heading: {
//         type: String,
//         required: [true, "Please Enter the heading for product"],
//         trim: true,
//     },
//     title: {
//         type: String,
//         required: [true, "please Enter product title"]
//     },
//     price: {
//         type: Number,
//         required: [true, "Please Enter product Price"],
//         maxLength: [8, "Price connot exceed 8 number"]
//     },
//     ratings: {
//         type: Number,
//         default: 0,
//     },
//     discount: {
//         type: Number,
//         required: [true, "Please Enter the discount"]
//     },
//     offers: {
//         type: [String],
//         required: [true, "Please Enter the product discount"]
//     },
//     images: [
//         {
//             public_id: {
//                 type: String,
//                 required: true,
//             },
//             public_url: {
//                 type: String,
//                 required: true,
//             }
//         }
//     ],
//     category: {
//         type: String,
//         required: [true, "Please Enter the product Category"]
//     },
//     description: [
//         {
//             image: { type: String },
//             desc: { type: String },
//         }
//     ],
//     Stock: {
//         type: Number,
//         required: [true, "Please Enter product Stock"],
//         maxLength: [4, "Stock cannot exceed 4 characters"],
//         default: 1,
//     },
//     numOfReviews: {
//         type: Number,
//         default: 0,
//     },
//     reviews: [
//         {
//             user: {
//                 type: mongoose.Schema.ObjectId,
//                 ref: "User1",
//                 required: true,
//             },
//             name: {
//                 type: String,
//                 required: true,
//             },
//             rating: {
//                 type: Number,
//                 required: true,
//             },
//             comment: {
//                 type: String,
//                 required: true
//             }
//         }
//     ],
//     user: {
//         type: mongoose.Schema.ObjectId,
//         ref: "User1",
//         required: true,
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now
//     }


// })

// const Product1 = mongoose.model('product', productSchema1)

// export default Product1;

const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    heading: {
        type: String,
        required: [true, "Please Enter the heading for product"],
        trim: true,
    },
    title: {
        type: String,
        // required: [true, "please Enter product title"]
        default: "",
    },
    price: {
        type: Number,
        required: [true, "Please Enter product Price"],
        maxLength: [8, "Price connot exceed 8 number"]
    },
    description: {
        type: String,
        required: [true, "Please Enter the description of the product"],
    },
    ratings: {
        type: Number,
        default: 3,
    },
    discount: {
        type: Number,
        required: [true, "Please Enter the discount"]
    },
    details: {
        type: [String],
        required: [true, "Please Enter the product discount"]
    },
    images: [
        {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
        },
    ],
    category: {
        type: String,
        required: [true, "Please Enter the product Category"]
    },
    // description: [
    //     {
    //         image: {
    //             public_id: {
    //                 type: String,
    //                 required: true
    //             },
    //             url: {
    //                 type: String,
    //                 required: true
    //             }
    //         },
    //         desc: { type: String },
    //     }
    // ],
    Stock: {
        type: Number,
        required: [true, "Please Enter product Stock"],
        maxLength: [4, "Stock cannot exceed 4 characters"],
        default: 1,
    },
    numOfReviews: {
        type: Number,
        default: 0,
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            rating: {
                type: Number,
                required: true,
            },
            comment: {
                type: String,
                required: true
            },
            img_url: {
                type: String,
                required: true

            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }


})

const Product = mongoose.model('Product', productSchema)

module.exports = Product;