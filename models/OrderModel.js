const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    shippingInfor: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        address: { type: String, required: true, default: 'India' },
        pinCode: { type: Number, required: true, },
        phoneNo: { type: String, required: true, }

    },
    orderItems: [
        {
            heading: {
                type: String,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            quantity: {
                type: String,
                required: true,
            },
            image: {
                type: Object,
                required: true,
            },
            product: {
                type: mongoose.Schema.ObjectId,
                ref: "Product",
                required: true,
            },
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    paymentInfo: {
        type: String,
        default: 'Cash on Delivery',
    },
    paidAt: {
        type: Date,
        required: true,
    },
    itemsPrice: {
        type: Number,
        required: true,
        default: 0,
    },
    taxPrice: {
        type: Number,
        required: true,
        default: 0,
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0,
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0,
    },
    discount: {
        type: Number,
        required: true,
        default: 0,
    },

    orderStatus: {
        type: String,
        required: true,
        default: "Processing",
    },
    deliveredAt: Date,
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('Order', orderSchema);