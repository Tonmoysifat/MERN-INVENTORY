const mongoose = require("mongoose");
const DataSchema = new mongoose.Schema({
        UserEmail: {type: String},
        Name:{type:String},
    },
    {timestamps: true, versionKey: false}
)
const ExpenseTypeModel = mongoose.model("expense-types",DataSchema)
module.exports = ExpenseTypeModel