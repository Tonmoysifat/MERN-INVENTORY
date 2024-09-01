const SaleModel = require("../../models/sales/SaleModel");

const SaleSummaryService = async (req) => {
    try {
        let UserEmail = req.headers["email"]
        let data = await SaleModel.aggregate([
            {$match: {UserEmail: UserEmail}},
            {
                $facet: {
                    Total: [
                        {
                            $group: {
                                _id: 0,
                                TotalAmount: {
                                    $sum: "$GrandTotal"
                                }
                            }
                        }
                    ],
                    last30Days: [
                        {
                            $group: {
                                _id: {
                                    $dateToString: {
                                        format: "%Y-%m-%d",
                                        date: "$createdAt"
                                    }
                                },
                                TotalAmount: {
                                    $sum: "$GrandTotal"
                                }
                            }
                        },
                        {
                            $sort: {
                                _id: -1
                            }
                        },
                        {
                            $limit: 30
                        }
                    ]
                }
            }
        ])
        return {status: "Success", data: data}

    } catch (e) {
        return {status: "Fail", data: e.toString()}
    }
}
module.exports = SaleSummaryService