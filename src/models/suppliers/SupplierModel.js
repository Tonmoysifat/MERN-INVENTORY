const mongoose = require("mongoose");
const DataSchema = new mongoose.Schema({
        UserEmail: {type: String},
        SupplierName:{type:String},
        SupplierPhone:{type:String},
        SupplierEmail:{type:String},
        SupplierAddress:{type:String},
    },
    {timestamps: true, versionKey: false}
)
const SupplierModel = mongoose.model("suppliers",DataSchema)
module.exports = SupplierModel