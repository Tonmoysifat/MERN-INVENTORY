const mongoose = require("mongoose");
const DeleteParentChildService = async (req, parentModel, childModel, joinPropertyName) => {
    const session = await mongoose.startSession();
    try {

        await session.startTransaction()
        let DeleteID = req.params.id
        let UserEmail = req.headers["email"]

        let childQueryObject = {}
        childQueryObject[joinPropertyName] = DeleteID
        childQueryObject["UserEmail"] = UserEmail

        let parentQueryObject = {}
        parentQueryObject["_id"] = DeleteID
        parentQueryObject["UserEmail"] = UserEmail

        let childDelete = await childModel.deleteMany(childQueryObject).session(session)
        let parentDelete = await parentModel.deleteMany(parentQueryObject).session(session)

        await session.commitTransaction()
        session.endSession()

        return {status: "Success", parent: parentDelete, child: childDelete}

    } catch (e) {

        await session.abortTransaction()
        session.endSession()

        return {status: "Fail", data: e.toString()}

    }
}

module.exports = DeleteParentChildService