const CreateService = require("../../services/common/CreateService");
const UpdateService = require("../../services/common/UpdateService");
const ListService = require("../../services/common/ListService");
const DropDownService = require("../../services/common/DropDownService");
const SupplierModel = require("../../models/suppliers/SupplierModel");
const mongoose = require("mongoose");
const CheckAssociateService = require("../../services/common/CheckAssociateService");
const DeleteService = require("../../services/common/DeleteService");
const PurchaseModel = require("../../models/purchases/PurchaseModel");
const DetailsByIdService = require("../../services/common/DetailsByIdService");

exports.CreateSupplier = async (req,res) => {
    let result = await CreateService(req, SupplierModel,"SupplierName")
    res.status(200).json(result)
}

exports.SupplierDetailsById = async (req,res) => {
    let result = await DetailsByIdService(req, SupplierModel)
    res.status(200).json(result)
}

exports.UpdateSupplier = async (req,res) => {
    let result = await UpdateService(req, SupplierModel)
    res.status(200).json(result)
}

exports.SupplierList = async (req,res) => {
    let searchRgx = {$regex:req.params.searchKeyword , $options:"i"}
    let searchArray = [{SupplierName:searchRgx},{SupplierPhone:searchRgx},{SupplierEmail:searchRgx},{SupplierAddress:searchRgx}]
    let result = await ListService(req, SupplierModel,searchArray)
    res.status(200).json(result)
}

exports.SupplierDropDown = async (req,res) => {
    let result = await DropDownService(req, SupplierModel,{_id:1,SupplierName:1})
    res.status(200).json(result)
}

exports.DeleteSupplier = async (req, res)=>{
    let DeleteID = req.params.id
    const ObjectId = mongoose.Types.ObjectId
    let checkAssociate = await CheckAssociateService({SupplierID: new ObjectId(DeleteID)},PurchaseModel)
    if (checkAssociate){
        res.status(200).json({status:"Associated", data:"Associated With Purchase"})
    }
    else {
        let result = await DeleteService(req,SupplierModel)
        res.status(200).json(result)
    }
}