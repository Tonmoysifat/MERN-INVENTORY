const CreateService = require("../../services/common/CreateService");
const UpdateService = require("../../services/common/UpdateService");
const ListOneJoinService = require("../../services/common/ListOneJoinService");
const ExpenseModel = require("../../models/expenses/ExpenseModel");
const DeleteService = require("../../services/common/DeleteService");
const DetailsByIdService = require("../../services/common/DetailsByIdService");


exports.CreateExpense = async (req,res) => {
    let result = await CreateService(req, ExpenseModel)
    res.status(200).json(result)
}

exports.ExpenseDetailsById = async (req,res) => {
    let result = await DetailsByIdService(req, ExpenseModel)
    res.status(200).json(result)
}

exports.UpdateExpense = async (req,res) => {
    let result = await UpdateService(req, ExpenseModel)
    res.status(200).json(result)
}

exports.ExpenseList = async (req,res) => {
    let searchRgx = {$regex:req.params.searchKeyword , $options:"i"}
    let searchArray = [{Note:searchRgx},{"Type.Name":searchRgx}]
    let joinStage = {$lookup:{from:"expense-types",localField:"TypeID",foreignField:"_id",as:"Type"}}
    let result = await ListOneJoinService(req, ExpenseModel,searchArray,joinStage)
    res.status(200).json(result)
}

exports.DeleteExpense = async (req,res)=>{
    let result = await DeleteService(req, ExpenseModel)
    res.status(200).json(result)
}
