const {EncodeToken} = require("../../utility/TokenHelper");


const UserLoginService = async (req, userModel) => {
    try {
        let data = await userModel.aggregate([{$match: req.body}, {$project: {createdAt: 0, updatedAt: 0}}])
        if (data.length > 0) {
            let token = await EncodeToken(data[0]["email"], data[0]["_id"].toString())
            return {status: "Success", token: token, data: data[0]}
        }
        else {
            return {status: "unauthorized"}
        }
    } catch (e) {
        return {status: "Fail", data: e.toString()}
    }
}

module.exports = UserLoginService