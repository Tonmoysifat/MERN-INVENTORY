import React, {Fragment, useEffect} from 'react';
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {BrandDetailsByIdRequest, CreateBrandRequest} from "../../apiRequest/BrandApiRequest.js";
import store from "../../redux/store/Store.js";
import {setBrandFormValue, setBrandFormValueReset} from "../../redux/sate-slice/Brand-slice.js";
import {IsEmpty} from "../../helper/FormHelper.js";
import toast from "react-hot-toast";
import {CategoryDetailsByIdRequest, CreateCategoryRequest} from "../../apiRequest/CategoryApiRequest.js";
import {setCategoryFormValue, setCategoryFormValueReset} from "../../redux/sate-slice/Category-slice.js";

const CategoryCreateUpdate = () => {
    let FormValue = useSelector((state) => (state.category.FormValue));
    let navigate = useNavigate();
    let params = new URLSearchParams(window.location.search)
    let id = params.get("id")
    useEffect(() => {
        if (id !== null) {
            (async () => {
                await CategoryDetailsByIdRequest(id);
            })()
        } else {
            store.dispatch(setCategoryFormValueReset())
        }
    }, [id]);
    const SaveChange = async () => {
        if (IsEmpty(FormValue.Name)) {
            toast.error("Category Name Required !")
        } else {
            if (await CreateCategoryRequest(FormValue, id)) {
                navigate("/category-list")
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
                                    <h5>Save Category</h5>
                                    <hr className="bg-light"/>
                                    <div className="col-4 p-2">
                                        <label className="form-label">Category Name</label>
                                        <input onChange={(e) => {
                                            store.dispatch(setCategoryFormValue({
                                                fieldName: "Name",
                                                value: e.target.value
                                            }))
                                        }} className="form-control form-control-sm"
                                               value={FormValue["Name"]} type="text"/>
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

export default CategoryCreateUpdate;