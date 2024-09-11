const CheckAssociateService = async (queryObject, associateModel) => {
    try {
        let data = await associateModel.aggregate([
            {$match: queryObject}
        ])
        return data.length > 0
    } catch (e) {
        return false
    }
}
module.exports = CheckAssociateService