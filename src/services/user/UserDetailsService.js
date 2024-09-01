const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const UserDetailsService = async (req, userModel) => {
    try {
        let user = {
            $and: [
                {
                    email: req.headers["email"]
                },
                {
                    _id: new ObjectId(req.headers["user_id"])
                }
            ]
        }
        let data = await userModel.aggregate([{$match: user}])
        return {status: "Success", data: data}
    } catch (e) {
        return {status: "Fail", data: e.toString()}
    }
}
module.exports = UserDetailsService