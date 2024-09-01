const DeleteService = async (req, DataModel) => {

    try {

        let DeleteID = req.params.id
        let UserEmail = req.headers["email"]

        let QueryObject = {}
        QueryObject["_id"] = DeleteID
        QueryObject["UserEmail"] = UserEmail

        let data = await DataModel.deleteMany(QueryObject)

        return {status: "Success", data: data}

    } catch (e) {

        return {status: "Fail", data: e.toString()}

    }
}

module.exports = DeleteService