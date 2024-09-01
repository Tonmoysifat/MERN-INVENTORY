const mongoose = require("mongoose");
const DataSchema = new mongoose.Schema({
        UserEmail: {type: String},
        PurchaseID: {type: mongoose.Schema.Types.ObjectId},
        ProductID: {type: mongoose.Schema.Types.ObjectId},
        Quantity:{type: Number},
        UnitCost:{type: Number},
        Total:{type: Number},
    },
    {timestamps: true, versionKey: false}
)
const PurchaseProductModel = mongoose.model("purchase-products", DataSchema)
module.exports = PurchaseProductModel