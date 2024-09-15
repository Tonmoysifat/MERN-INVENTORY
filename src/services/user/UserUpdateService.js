const UserUpdateService = async (req, userModel) => {
    try {
        let data = await userModel.updateOne({email: req.headers["email"]}, req.body)
        return {status: "Success", data: data}
    } catch (e) {
        return {status: "Fail", data: e.toString()}
    }
}
module.exports = UserUpdateService