const mongoose = require("mongoose");
const DataSchema = new mongoose.Schema({
        UserEmail: {type: String},
        ReturnID: {type: mongoose.Schema.Types.ObjectId},
        ProductID: {type: mongoose.Schema.Types.ObjectId},
        Quantity:{type: Number},
        UnitCost:{type: Number},
        Total:{type: Number},
    },
    {timestamps: true, versionKey: false}
)
const ReturnProductModel = mongoose.model("return-products", DataSchema)
module.exports = ReturnProductModel