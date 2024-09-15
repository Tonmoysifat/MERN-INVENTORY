const CreateParentChildService = require("../../services/common/CreateParentChildService");
const ReturnModel = require("../../models/returns/ReturnModel");
const ReturnProductModel = require("../../models/returns/ReturnProductModel");
const ListOneJoinService = require("../../services/common/ListOneJoinService");
const DeleteParentChildService = require("../../services/common/DeleteParentChildService");
const SaleModel = require("../../models/sales/SaleModel");
const SaleProductModel = require("../../models/sales/SaleProductModel");

exports.CreateReturn = async (req,res)=>{
    let result = await CreateParentChildService(req, ReturnModel,ReturnProductModel,"ReturnID")
    res.status(200).json(result)
}

exports.ReturnList = async (req,res) => {
    let searchRgx = {$regex:req.params.searchKeyword , $options:"i"}
    let searchArray = [{Note:searchRgx},{"customers.CustomerName":searchRgx},
        {"customers.CustomerPhone":searchRgx},{"customers.CustomerEmail":searchRgx},
        {"customers.CustomerAddress":searchRgx}]
    let joinStage = {$lookup:{from:"customers",localField:"CustomerID",foreignField:"_id",as:"customers"}}
    let result = await ListOneJoinService(req, ReturnModel,searchArray,joinStage)
    res.status(200).json(result)
}

exports.ReturnDelete = async (req,res)=>{
    let result = await DeleteParentChildService(req, ReturnModel,ReturnProductModel,"ReturnID")
    res.status(200).json(result)
}