const ExpenseReportService = require("../../services/report/ExpenseReportService");
const PurchaseReportService = require("../../services/report/PurchaseReportService");
const SaleReportService = require("../../services/report/SaleReportService");
const ReturnReportService = require("../../services/report/ReturnReportService");

exports.ExpenseByDate = async (req,res)=>{
    let result = await ExpenseReportService(req)
    res.status(200).json(result)
}

exports.PurchaseByDate = async (req,res)=>{
    let result = await PurchaseReportService(req)
    res.status(200).json(result)
}

exports.SaleByDate = async (req,res)=>{
    let result = await SaleReportService(req)
    res.status(200).json(result)
}

exports.ReturnByDate = async (req,res)=>{
    let result = await ReturnReportService(req)
    res.status(200).json(result)
}