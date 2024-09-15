const mongoose = require("mongoose");
const DataSchema = new mongoose.Schema({
        email: {type: String},
        otp: {type: String},
        status: {type: String},
    },
    {timestamps: true, versionKey: false}
)
const otpsModel = mongoose.model("otps",DataSchema)
module.exports = otpsModel