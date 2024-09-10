const uploadResult = require("../../utility/cloudin");
const UserProImgUpdateService = async (req, userModel) => {
    try {
        const img = await uploadResult(req.file.path)
        let userData = {
            photo: img.secure_url
        }
        let data = await userModel.updateOne({email: req.headers["email"]}, userData)
        return {status: "Success", data: data}
    } catch (e) {
        return {status: "Fail", data: e.toString()}
    }
}
module.exports = UserProImgUpdateService