const DropDownService = async (req, DataModel,Projection) => {
    try {
        let UserEmail = req.headers["email"]
        let data = await DataModel.aggregate([
            {$match:{UserEmail:UserEmail}},
            {$project:Projection}
        ])
        return {status: "Success", data: data}
    } catch (e) {
        return {status: "Fail", data: e.toString()}
    }
}
module.exports = DropDownService