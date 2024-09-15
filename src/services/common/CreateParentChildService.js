const mongoose = require("mongoose");
const CreateParentChildService = async (req, parentModel, childModel, joinPropertyName) => {
    const session = await mongoose.startSession();
    try {
        await session.startTransaction()
        let parent = req.body["parent"]
        parent.UserEmail = req.headers["email"]
        let parentCreation = await parentModel.create([parent], {session})

        let child = req.body["child"]
        child.forEach((elements) => {
            elements[joinPropertyName] = parentCreation[0]["_id"]
            elements["UserEmail"] = req.headers["email"]
        })
        let childCreation = await childModel.insertMany(child, {session})

        await session.commitTransaction()
        session.endSession()
        return {status: "Success", parent: parentCreation, child: childCreation}
    } catch (e) {
        await session.abortTransaction()
        session.endSession()
        return { status: "Fail", data: e.toString() }
    }
}
module.exports = CreateParentChildService