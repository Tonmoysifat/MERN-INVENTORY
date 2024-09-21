const CreateService = async (req,DataModel,fieldName) => {
    try{
        let postBody = req.body
        // postBody.map(item=>item.UserEmail = req.headers["email"])
        postBody.UserEmail = req.headers["email"]
        let match = {
            $and: [
                {
                    UserEmail: postBody["UserEmail"]
                },
                {
                    [fieldName]: postBody[fieldName]
                }
            ]
        }
        let aggrgt = await DataModel.aggregate([{$match: match}])
        if (aggrgt.length>0){
            return {status:"Matched",data:"Already Created"}
        }
        else {
            let data = await DataModel.create(postBody)
            return {status:"Success",data:data}
        }
    }
    catch (e) {
        return { status: "Fail", data: e}
    }
}
module.exports = CreateService