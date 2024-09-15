
const EmailSend = require("../../utility/EmailHelper");

const UserVerifyEmailService = async (req, userModel,otpsModel) => {
    try {
        let email = req.params.email;
        let otp = Math.random().toString(36).substr(2, 2).toUpperCase() + Math.random().toString(36).substr(2, 2) + Math.random().toString(36).substr(2, 2)
        let status = "unUsed";
        let data = await userModel.aggregate([{$match:{email:email}},{$count:"total"}])
        if (data.length>0){
            await otpsModel.updateOne({email: email}, {$set: {otp: otp, status:status}}, {upsert: true})
            await EmailSend(email, `Your Verification Code is= ${otp}`, "Inventory PIN Verification")
            return {status: "Success", data: "6 Digit OTP has been send"}
        }
        else {
            return {status: "Fail", data: "No User Found"}
        }
    } catch (e) {
        return {status: "Fail", data: e.toString()}
    }
}
module.exports = UserVerifyEmailService