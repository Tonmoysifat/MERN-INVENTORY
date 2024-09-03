const ExpenseModel = require("../../models/expenses/ExpenseModel");

const ExpenseReportService = async (req) => {
    try {
        let UserEmail = req.headers["email"];
        let FromDate = req.body["FromDate"];
        let ToDate = req.body["ToDate"];

        // Convert FromDate and ToDate to strings in 'YYYY-MM-DD' format
        const fromDateStr = new Date(FromDate).toISOString().split('T')[0];
        const toDateStr = new Date(ToDate).toISOString().split('T')[0];

        let data = await ExpenseModel.aggregate([
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
                                    $sum: "$Amount"
                                }
                            }
                        }
                    ],
                    Rows: [
                        {$lookup: {from: "expense-types", localField: "TypeID", foreignField: "_id", as: "Type"}}
                    ]
                }
            }
        ]);

        return {status: "Success", data: data};
    } catch (e) {
        return {status: "Fail", data: e.toString()};
    }
};

module.exports = ExpenseReportService;
