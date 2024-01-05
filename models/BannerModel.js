const mongoose = require("mongoose")


const bannerSchema = new mongoose.Schema({
    image: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }
})

const Banner = mongoose.model("Banner", bannerSchema)
module.exports = Banner;