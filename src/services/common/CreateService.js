const CreateService = async (req,DataModel) => {
    try{
        let postBody = req.body
        // postBody.map(item=>item.UserEmail = req.headers["email"])
        postBody.UserEmail = req.headers["email"]
        let data = await DataModel.create(postBody)
        return {status:"Success",data:data}
    }
    catch (e) {
        return { status: "Fail", data: e}
    }
}
module.exports = CreateService