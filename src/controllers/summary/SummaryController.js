const ExpenseSummaryService = require("../../services/summary/ExpenseSummaryService");
const PurchaseSummaryService = require("../../services/summary/PurchaseSummaryService");
const SaleSummaryService = require("../../services/summary/SaleSummaryService");
const ReturnSummaryService = require("../../services/summary/ReturnSummaryService");

exports.ExpenseSummary = async (req,res)=>{
    let result = await ExpenseSummaryService(req)
    res.status(200).json(result)
}

exports.PurchaseSummary = async (req,res)=>{
    let result = await PurchaseSummaryService(req)
    res.status(200).json(result)
}

exports.SaleSummary = async (req,res)=>{
    let result = await SaleSummaryService(req)
    res.status(200).json(result)
}

exports.ReturnSummary = async (req,res)=>{
    let result = await ReturnSummaryService(req)
    res.status(200).json(result)
}