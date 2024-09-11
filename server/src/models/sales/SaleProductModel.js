const mongoose = require("mongoose");
const DataSchema = new mongoose.Schema({
        UserEmail: {type: String},
        SaleID: {type: mongoose.Schema.Types.ObjectId},
        ProductID: {type: mongoose.Schema.Types.ObjectId},
        Quantity:{type: Number},
        UnitCost:{type: Number},
        Total:{type: Number},
    },
    {timestamps: true, versionKey: false}
)
const SaleProductModel = mongoose.model("sale-products", DataSchema)
module.exports = SaleProductModel