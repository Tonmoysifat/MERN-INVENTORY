const UpdateService = async (req, DataModel) => {
    try {
        let UserEmail = req.headers["email"]
        let id = req.params.id
        let postBody = req.body
        let data = await DataModel.updateOne({_id: id, UserEmail: UserEmail}, postBody)
        return {status: "Success", data: data}
    } catch (e) {
        return {status: "Fail", data: e.toString()}
    }
}
module.exports = UpdateService