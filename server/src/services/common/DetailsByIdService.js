const mongoose = require("mongoose")

const DetailsByIdService = async (req,DataModel)=>{
    try{
        let DetailsID = req.params.id;
        let UserEmail = req.headers["email"]
        const ObjectId = mongoose.Types.ObjectId
        let queryObject = {}
        queryObject["_id"] = new ObjectId(DetailsID)
        queryObject["UserEmail"] = UserEmail
        let data = await DataModel.aggregate([
            {$match:queryObject}
        ])
        return {status:"Success",data:data}
    }
    catch (e) {
        return { status: "Fail", data: e.toString() }
    }
}
module.exports = DetailsByIdService