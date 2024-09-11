const UserVerifyOtpService = async (req, otpsModel) => {
    try {

        let email = req.params.email;
        let otp = req.params.otp
        let status = "unUsed";
        let updateStatus = "Used"
        let data = await otpsModel.aggregate([{$match: {email: email, otp: otp, status: status}}, {$count: "total"}])

        if (data.length > 0) {
            await otpsModel.updateOne({email: email, otp: otp, status: status}, {$set: {status: updateStatus}})
            return {status: "Success", message: "Valid OTP"}
        } else {
            return {status: "Fail", data: "Invalid OTP Code"}
        }
    } catch (e) {
        return {status: "Fail", data: e.toString()}
    }
}
module.exports = UserVerifyOtpService