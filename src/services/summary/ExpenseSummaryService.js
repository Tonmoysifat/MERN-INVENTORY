const ExpenseModel = require("../../models/expenses/ExpenseModel");

const ExpenseSummaryService = async (req) => {
    try {
        let UserEmail = req.headers["email"]
        let data = await ExpenseModel.aggregate([
            {$match: {UserEmail: UserEmail}},
            {
                $facet: {
                    Total: [
                        {
                            $group: {
                                _id: 0,
                                TotalAmount: {
                                    $sum: "$Amount"
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
                                    $sum: "$Amount"
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
module.exports = ExpenseSummaryService