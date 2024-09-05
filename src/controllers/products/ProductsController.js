const CreateService = require("../../services/common/CreateService");
const UpdateService = require("../../services/common/UpdateService");
const ProductsModel = require("../../models/products/ProductsModel");
const ListTwoJoinService = require("../../services/common/ListTwoJoinService");
const mongoose = require("mongoose");
const CheckAssociateService = require("../../services/common/CheckAssociateService");
const DeleteService = require("../../services/common/DeleteService");
const PurchaseProductModel = require("../../models/purchases/PurchaseProductModel");
const SaleProductModel = require("../../models/sales/SaleProductModel");
const ReturnProductModel = require("../../models/returns/ReturnProductModel");
const DetailsByIdService = require("../../services/common/DetailsByIdService");
const DropDownService = require("../../services/common/DropDownService");

exports.CreateProduct = async (req, res) => {
    let result = await CreateService(req, ProductsModel)
    res.status(200).json(result)
}

exports.ProductDetailsById = async (req,res) => {
    let result = await DetailsByIdService(req, ProductsModel)
    res.status(200).json(result)
}

exports.UpdateProduct = async (req, res) => {
    let result = await UpdateService(req, ProductsModel)
    res.status(200).json(result)
}

exports.ProductList = async (req, res) => {
    let searchRgx = {$regex: req.params.searchKeyword, $options: "i"}
    let searchArray = [{Name: searchRgx}, {Unit: searchRgx}, {Details: searchRgx}, {"BrandID.Name": searchRgx},
        {"CategoryID.Name": searchRgx}
    ]
    let joinStage1 = {$lookup: {from: "brands", localField: "BrandID", foreignField: "_id", as: "brand"}}
    let joinStage2 = {$lookup: {from: "categories", localField: "CategoryID", foreignField: "_id", as: "category"}}
    let result = await ListTwoJoinService(req, ProductsModel, searchArray, joinStage1, joinStage2)
    res.status(200).json(result)
}

exports.DeleteProduct = async (req, res) => {
    let DeleteID = req.params.id
    const ObjectId = mongoose.Types.ObjectId
    let checkPurchaseAssociate = await CheckAssociateService({ProductID: new ObjectId(DeleteID)}, PurchaseProductModel)
    let checkSaleAssociate = await CheckAssociateService({ProductID: new ObjectId(DeleteID)}, SaleProductModel)
    let checkReturnAssociate = await CheckAssociateService({ProductID: new ObjectId(DeleteID)}, ReturnProductModel)
    if (checkPurchaseAssociate) {
        res.status(200).json({status: "Associated", data: "Associated With Purchase"})
    } else if (checkSaleAssociate) {
        res.status(200).json({status: "Associated", data: "Associated With Sale"})
    } else if (checkReturnAssociate) {
        res.status(200).json({status: "Associated", data: "Associated With Return"})
    } else {
        let result = await DeleteService(req, ProductsModel)
        res.status(200).json(result)
    }
}

exports.ProductDropDown = async (req,res) => {
    let result = await DropDownService(req, ProductsModel,{_id:1,Name:1})
    res.status(200).json(result)
}
