import React, {Fragment, useEffect} from 'react';
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import store from "../../redux/store/Store.js";
import {IsEmpty} from "../../helper/FormHelper.js";
import toast from "react-hot-toast";
import {
    BrandDropDownRequest,
    CategoryDropDownRequest, CreateProductRequest,
    ProductDetailsByIdRequest
} from "../../apiRequest/ProductApiRequest.js";
import {setProductFormValue, setProductFormValueReset} from "../../redux/sate-slice/Product-slice.js";

const ProductCreateUpdate = () => {
    let FormValue = useSelector((state) => (state.product.FormValue));
    let BrandDropDownValue = useSelector((state) => (state.product.BrandDropDown));
    let CategoryDropDownValue = useSelector((state) => (state.product.CategoryDropDown));
    let navigate = useNavigate();
    let params = new URLSearchParams(window.location.search)
    let id = params.get("id")
    useEffect(() => {
        (async () => {
            await BrandDropDownRequest()
            await CategoryDropDownRequest()
        })()
        if (id !== null) {
            (async () => {
                await ProductDetailsByIdRequest(id);
            })()
        } else {
            store.dispatch(setProductFormValueReset())
        }
    }, [id]);
    const SaveChange = async () => {
        if (IsEmpty(FormValue.BrandID)) {
            toast.error("Product Brand Required!")
        } else if (IsEmpty(FormValue.CategoryID)) {
            toast.error("Product Category Required!")
        } else if (IsEmpty(FormValue.Name)) {
            toast.error("Product Name Required!")
        } else if (IsEmpty(FormValue.Unit)) {
            toast.error("Product Unit Required!")
        } else {
            if (await CreateProductRequest(FormValue, id)) {
                navigate("/product-list")
            }
        }
    }
    return (

        <Fragment>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <h5>Save Product</h5>
                                    <hr className="bg-light"/>
                                    <div className="col-4 p-2">
                                        <label className="form-label">Product Name</label>
                                        <input onChange={(e) => {
                                            store.dispatch(setProductFormValue({
                                                fieldName: "Name",
                                                value: e.target.value
                                            }))
                                        }} className="form-control form-control-sm"
                                               value={FormValue["Name"]} type="text"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label className="form-label">Product Brand</label>
                                        <select onChange={(e) => {
                                            store.dispatch(setProductFormValue({
                                                fieldName: "BrandID",
                                                value: e.target.value
                                            }))
                                        }} value={FormValue.BrandID} className="form-select form-select-sm">
                                            <option value="">Select Type</option>
                                            {
                                                BrandDropDownValue.map((item, i) => {
                                                    return (<option key={i.toLocaleString()}
                                                                    value={item._id}>{item.Name}</option>)
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label className="form-label">Product Category</label>
                                        <select onChange={(e) => {
                                            store.dispatch(setProductFormValue({
                                                fieldName: "CategoryID",
                                                value: e.target.value
                                            }))
                                        }} value={FormValue.CategoryID} className="form-select form-select-sm">
                                            <option value="">Select Type</option>
                                            {
                                                CategoryDropDownValue.map((item, i) => {
                                                    return (<option key={i.toLocaleString()}
                                                                    value={item._id}>{item.Name}</option>)
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label className="form-label">Unit</label>
                                        <input onChange={(e) => {
                                            store.dispatch(setProductFormValue({
                                                fieldName: "Unit",
                                                value: e.target.value
                                            }))
                                        }} className="form-control form-control-sm"
                                               value={FormValue["Unit"]} type="text"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label className="form-label">Details</label>
                                        <input onChange={(e) => {
                                            store.dispatch(setProductFormValue({
                                                fieldName: "Details",
                                                value: e.target.value
                                            }))
                                        }} className="form-control form-control-sm"
                                               value={FormValue["Details"]} type="text"/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4 p-2">
                                        <button onClick={SaveChange} className="btn btn-sm my-3 btn-success">Save
                                            Change
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default ProductCreateUpdate;