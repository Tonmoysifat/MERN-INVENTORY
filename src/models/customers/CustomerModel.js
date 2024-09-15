const mongoose = require("mongoose");
const DataSchema = new mongoose.Schema({
        UserEmail: {type: String},
        CustomerName:{type:String},
        CustomerPhone:{type:String, unique: true},
        CustomerEmail:{type:String},
        CustomerAddress:{type:String},
    },
    {timestamps: true, versionKey: false}
)
const CustomerModel = mongoose.model("customers",DataSchema)
module.exports = CustomerModel