const CreateService = require("../../services/common/CreateService");
const UpdateService = require("../../services/common/UpdateService");
const ListService = require("../../services/common/ListService");
const DropDownService = require("../../services/common/DropDownService");
const BrandsModel = require("../../models/brands/BrandsModel");
const mongoose = require("mongoose");
const CheckAssociateService = require("../../services/common/CheckAssociateService");
const ProductsModel = require("../../models/products/ProductsModel");
const DeleteService = require("../../services/common/DeleteService");
const DetailsByIdService = require("../../services/common/DetailsByIdService");

exports.CreateBrand = async (req,res) => {
    let result = await CreateService(req, BrandsModel)
    res.status(200).json(result)
}

exports.BrandDetailsById = async (req,res) => {
    let result = await DetailsByIdService(req, BrandsModel)
    res.status(200).json(result)
}

exports.UpdateBrand = async (req,res) => {
    let result = await UpdateService(req, BrandsModel)
    res.status(200).json(result)
}

exports.BrandList = async (req,res) => {
    let searchRgx = {$regex:req.params.searchKeyword , $options:"i"}
    let searchArray = [{Name:searchRgx}]
    let result = await ListService(req, BrandsModel,searchArray)
    res.status(200).json(result)
}

exports.BrandDropDown = async (req,res) => {
    let result = await DropDownService(req, BrandsModel,{_id:1,Name:1})
    res.status(200).json(result)
}

exports.DeleteBrand = async (req, res)=>{
    let DeleteID = req.params.id
    const ObjectId = mongoose.Types.ObjectId
    let checkAssociate = await CheckAssociateService({BrandID: new ObjectId(DeleteID)},ProductsModel)
    if (checkAssociate){
        res.status(200).json({status:"Associated", data:"Associated With Product"})
    }
    else {
        let result = await DeleteService(req,BrandsModel)
        res.status(200).json(result)
    }
}