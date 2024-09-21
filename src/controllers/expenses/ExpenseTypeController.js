const CreateService = require("../../services/common/CreateService");
const UpdateService = require("../../services/common/UpdateService");
const ListService = require("../../services/common/ListService");
const DropDownService = require("../../services/common/DropDownService");
const ExpenseTypeModel = require("../../models/expenses/ExpenseTypeModel");
const mongoose = require("mongoose");
const CheckAssociateService = require("../../services/common/CheckAssociateService");
const DeleteService = require("../../services/common/DeleteService");
const ExpenseModel = require("../../models/expenses/ExpenseModel");
const DetailsByIdService = require("../../services/common/DetailsByIdService");

exports.CreateExpenseType = async (req,res) => {
    let result = await CreateService(req, ExpenseTypeModel,"Name")
    res.status(200).json(result)
}

exports.ExpenseTypeDetailsById = async (req,res) => {
    let result = await DetailsByIdService(req, ExpenseTypeModel)
    res.status(200).json(result)
}

exports.UpdateExpenseType = async (req,res) => {
    let result = await UpdateService(req, ExpenseTypeModel)
    res.status(200).json(result)
}

exports.ExpenseTypeList = async (req,res) => {
    let searchRgx = {$regex:req.params.searchKeyword , $options:"i"}
    let searchArray = [{Name:searchRgx}]
    let result = await ListService(req, ExpenseTypeModel,searchArray)
    res.status(200).json(result)
}

exports.ExpenseTypeDropDown = async (req,res) => {
    let result = await DropDownService(req, ExpenseTypeModel,{_id:1,Name:1})
    res.status(200).json(result)
}

exports.DeleteExpenseType = async (req, res)=>{
    let DeleteID = req.params.id
    const ObjectId = mongoose.Types.ObjectId
    let checkAssociate = await CheckAssociateService({TypeID: new ObjectId(DeleteID)},ExpenseModel)
    if (checkAssociate){
        res.status(200).json({status:"Associated", data:"Associated With Expense"})
    }
    else {
        let result = await DeleteService(req,ExpenseTypeModel)
        res.status(200).json(result)
    }
}