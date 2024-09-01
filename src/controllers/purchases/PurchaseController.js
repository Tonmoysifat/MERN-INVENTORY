const CreateParentChildService = require("../../services/common/CreateParentChildService");
const PurchaseModel = require("../../models/purchases/PurchaseModel");
const PurchaseProductModel = require("../../models/purchases/PurchaseProductModel");
const ListOneJoinService = require("../../services/common/ListOneJoinService");
const DeleteParentChildService = require("../../services/common/DeleteParentChildService");


exports.CreatePurchase = async (req,res)=>{
    let result = await CreateParentChildService(req, PurchaseModel,PurchaseProductModel,"PurchaseID")
    res.status(200).json(result)
}

exports.PurchaseList = async (req,res) => {
    let searchRgx = {$regex:req.params.searchKeyword , $options:"i"}
    let searchArray = [{Note:searchRgx},{"Suppliers.SupplierName":searchRgx},
        {"Suppliers.SupplierPhone":searchRgx},{"Suppliers.SupplierEmail":searchRgx},
        {"Suppliers.SupplierAddress":searchRgx}]
    let joinStage = {$lookup:{from:"suppliers",localField:"SupplierID",foreignField:"_id",as:"Suppliers"}}
    let result = await ListOneJoinService(req, PurchaseModel,searchArray,joinStage)
    res.status(200).json(result)
}

exports.PurchaseDelete = async (req,res)=>{
    let result = await DeleteParentChildService(req, PurchaseModel,PurchaseProductModel,"PurchaseID")
    res.status(200).json(result)
}