const CreateParentChildService = require("../../services/common/CreateParentChildService");
const SaleModel = require("../../models/sales/SaleModel");
const SaleProductModel = require("../../models/sales/SaleProductModel");
const ListOneJoinService = require("../../services/common/ListOneJoinService");
const DeleteParentChildService = require("../../services/common/DeleteParentChildService");

exports.CreateSale = async (req,res)=>{
    let result = await CreateParentChildService(req, SaleModel,SaleProductModel,"SaleID")
    res.status(200).json(result)
}

exports.SaleList = async (req,res) => {
    let searchRgx = {$regex:req.params.searchKeyword , $options:"i"}
    let searchArray = [{Note:searchRgx},{"customers.CustomerName":searchRgx},
        {"customers.CustomerPhone":searchRgx},{"customers.CustomerEmail":searchRgx},
        {"customers.CustomerAddress":searchRgx}]
    let joinStage = {$lookup:{from:"customers",localField:"CustomerID",foreignField:"_id",as:"customers"}}
    let result = await ListOneJoinService(req, SaleModel,searchArray,joinStage)
    res.status(200).json(result)
}

exports.SaleDelete = async (req,res)=>{
    let result = await DeleteParentChildService(req, SaleModel,SaleProductModel,"SaleID")
    res.status(200).json(result)
}