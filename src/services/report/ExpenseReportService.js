const ExpenseModel = require("../../models/expenses/ExpenseModel");
const ExpenseReportService = async (req) => {
    try {
        let UserEmail = req.headers["email"]
        let FromDate = req.body["FromDate"]
        let ToDate = req.body["ToDate"]
        let data = await ExpenseModel.aggregate([
            {$match: {UserEmail: UserEmail, createdAt: {$gte: new Date(FromDate), $lte: new Date(ToDate)}}},
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
                    ],
                }
            }
        ])
        return {status: "Success", data: data}
    } catch (e) {
        return {status: "Fail", data: e.toString()}
    }
}
module.exports = ExpenseReportService