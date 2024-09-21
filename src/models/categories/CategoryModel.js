const mongoose = require("mongoose");
const DataSchema = new mongoose.Schema({
        UserEmail: {type: String},
        Name:{type:String},
    },
    {timestamps: true, versionKey: false}
)
const CategoryModel = mongoose.model("categories",DataSchema)
module.exports = CategoryModel