const mongoose = require("mongoose");
const DataSchema = new mongoose.Schema({
        UserEmail: {type: String},
        SupplierID: {type: mongoose.Schema.Types.ObjectId},
        VatTax: {type: Number},
        Discount:{type: Number},
        OtherCost:{type: Number},
        ShippingCost:{type: Number},
        GrandTotal:{type: Number},
        Note:{type: String},
    },
    {timestamps: true, versionKey: false}
)
const PurchaseModel = mongoose.model("purchases", DataSchema)
module.exports = PurchaseModel