const mongoose = require("mongoose");
const DataSchema = new mongoose.Schema({
        UserEmail: {type: String},
        Name:{type:String},
    },
    {timestamps: true, versionKey: false}
)
const BrandsModel = mongoose.model("brands",DataSchema)
module.exports = BrandsModel