const SaleProductModel = require("../../models/sales/SaleProductModel");
const SaleReportService = async (req) => {
    try {
        let UserEmail = req.headers["email"]
        let FromDate = req.body["FromDate"]
        let ToDate = req.body["ToDate"]
        const fromDateStr = new Date(FromDate).toISOString().split('T')[0];
        const toDateStr = new Date(ToDate).toISOString().split('T')[0];
        let data = await SaleProductModel.aggregate([
            {
                $match: {
                    UserEmail: UserEmail,
                    $expr: {
                        $and: [
                            {$gte: [{$dateToString: {format: "%Y-%m-%d", date: "$createdAt"}}, fromDateStr]},
                            {$lte: [{$dateToString: {format: "%Y-%m-%d", date: "$createdAt"}}, toDateStr]}
                        ]
                    }
                }
            },
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
                        {$unwind: "$products"},
                        {$lookup: {from: "brands", localField: "products.BrandID", foreignField: "_id", as: "brands"}},
                        {
                            $lookup: {
                                from: "categories",
                                localField: "products.CategoryID",
                                foreignField: "_id",
                                as: "categories"
                            }
                        },
                    ],
                }
            }
        ])
        return {status: "Success", data: data}
    } catch (e) {
        return {status: "Fail", data: e.toString()}
    }
}
module.exports = SaleReportService