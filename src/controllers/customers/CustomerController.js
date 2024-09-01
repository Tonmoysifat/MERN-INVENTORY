const CreateService = require("../../services/common/CreateService");
const UpdateService = require("../../services/common/UpdateService");
const ListService = require("../../services/common/ListService");
const DropDownService = require("../../services/common/DropDownService");
const CustomerModel = require("../../models/customers/CustomerModel");
const mongoose = require("mongoose");
const CheckAssociateService = require("../../services/common/CheckAssociateService");
const DeleteService = require("../../services/common/DeleteService");
const SaleModel = require("../../models/sales/SaleModel");
const DetailsByIdService = require("../../services/common/DetailsByIdService");

exports.CreateCustomer = async (req,res) => {
    let result = await CreateService(req, CustomerModel)
    res.status(200).json(result)
}

exports.CustomerDetailsById = async (req,res) => {
    let result = await DetailsByIdService(req, CustomerModel)
    res.status(200).json(result)
}

exports.UpdateCustomer = async (req,res) => {
    let result = await UpdateService(req, CustomerModel)
    res.status(200).json(result)
}

exports.CustomerList = async (req,res) => {
    let searchRgx = {$regex:req.params.searchKeyword , $options:"i"}
    let searchArray = [{CustomerName:searchRgx},{CustomerPhone:searchRgx},{CustomerEmail:searchRgx},{CustomerAddress:searchRgx}]
    let result = await ListService(req, CustomerModel,searchArray)
    res.status(200).json(result)
}

exports.CustomerDropDown = async (req,res) => {
    let result = await DropDownService(req, CustomerModel,{_id:1,CustomerName:1})
    res.status(200).json(result)
}

exports.DeleteCustomer = async (req, res)=>{
    let DeleteID = req.params.id
    const ObjectId = mongoose.Types.ObjectId
    let checkAssociate = await CheckAssociateService({CustomerID: new ObjectId(DeleteID)},SaleModel)
    if (checkAssociate){
        res.status(200).json({status:"Associated", data:"Associated With Sale"})
    }
    else {
        let result = await DeleteService(req,CustomerModel)
        res.status(200).json(result)
    }
}