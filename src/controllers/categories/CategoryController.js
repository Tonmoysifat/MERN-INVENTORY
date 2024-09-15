const CreateService = require("../../services/common/CreateService");
const UpdateService = require("../../services/common/UpdateService");
const ListService = require("../../services/common/ListService");
const DropDownService = require("../../services/common/DropDownService");
const CategoryModel = require("../../models/categories/CategoryModel");
const mongoose = require("mongoose");
const CheckAssociateService = require("../../services/common/CheckAssociateService");
const ProductsModel = require("../../models/products/ProductsModel");
const DeleteService = require("../../services/common/DeleteService");
const DetailsByIdService = require("../../services/common/DetailsByIdService");

exports.CreateCategory = async (req,res) => {
    let result = await CreateService(req, CategoryModel)
    res.status(200).json(result)
}

exports.CategoryDetailsById = async (req,res) => {
    let result = await DetailsByIdService(req, CategoryModel)
    res.status(200).json(result)
}

exports.UpdateCategory = async (req,res) => {
    let result = await UpdateService(req, CategoryModel)
    res.status(200).json(result)
}

exports.CategoryList = async (req,res) => {
    let searchRgx = {$regex:req.params.searchKeyword , $options:"i"}
    let searchArray = [{Name:searchRgx}]
    let result = await ListService(req, CategoryModel,searchArray)
    res.status(200).json(result)
}

exports.CategoryDropDown = async (req,res) => {
    let result = await DropDownService(req, CategoryModel,{_id:1,Name:1})
    res.status(200).json(result)
}

exports.DeleteCategory = async (req, res)=>{
    let DeleteID = req.params.id
    const ObjectId = mongoose.Types.ObjectId
    let checkAssociate = await CheckAssociateService({CategoryID: new ObjectId(DeleteID)},ProductsModel)
    if (checkAssociate){
        res.status(200).json({status:"Associated", data:"Associated With Product"})
    }
    else {
        let result = await DeleteService(req,CategoryModel)
        res.status(200).json(result)
    }
}