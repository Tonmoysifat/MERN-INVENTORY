const mongoose = require("mongoose");
const DataSchema = new mongoose.Schema({
        email: {type: String, unique: true, required: true, lowercase: true},
        firstName:{type:String},
        lastName:{type:String},
        mobile:{type:String},
        password:{type:String},
        photo:{type:String},
    },
    {timestamps: true, versionKey: false}
)
const userModel = mongoose.model("users",DataSchema)
module.exports = userModel