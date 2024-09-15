const mongoose = require("mongoose");
const DataSchema = new mongoose.Schema({
        UserEmail: {type: String},
        CategoryID: {type: mongoose.Schema.Types.ObjectId},
        BrandID: {type: mongoose.Schema.Types.ObjectId},
        Name: {type: String},
        Unit: {type: String},
        Details: {type: String},
    },
    {timestamps: true, versionKey: false}
)
const ProductsModel = mongoose.model("products", DataSchema)
module.exports = ProductsModel