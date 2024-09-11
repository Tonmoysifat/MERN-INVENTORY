
const UserCreateService = async (req, userModel) => {
    try {
        let postBody = req.body;
        let data = await userModel.create(postBody)
        return { status: "Success", data: data }
    } catch (e) {
        return { status: "Fail", data: e }
    }
}

module.exports = UserCreateService