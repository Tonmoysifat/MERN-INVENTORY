const PurchaseProductModel = require("../../models/purchases/PurchaseProductModel");
const PurchaseReportService = async (req) => {
    try {
        let UserEmail = req.headers["email"]
        let FromDate = req.body["FromDate"]
        let ToDate = req.body["ToDate"]
        let data = await PurchaseProductModel.aggregate([
            {$match: {UserEmail: UserEmail, createdAt: {$gte: new Date(FromDate), $lte: new Date(ToDate)}}},
            {
                $facet: {
                    Total: [
                        {
                            $group: {
                                _id: 0,
                                TotalAmount: {
                                    $sum: "$Total"
                                }
                            }
                        }
                    ],
                    Rows: [
                        {$lookup: {from: "products", localField: "ProductID", foreignField: "_id", as: "products"}},
                        {$unwind:"$products"},
                        {$lookup: {from: "brands", localField: "products.BrandID", foreignField: "_id", as: "brands"}},
                        {$lookup: {from: "categories", localField: "products.CategoryID", foreignField: "_id", as: "categories"}},
                    ],
                }
            }
        ])
        return {status: "Success", data: data}
    } catch (e) {
        return {status: "Fail", data: e.toString()}
    }
}
module.exports = PurchaseReportService