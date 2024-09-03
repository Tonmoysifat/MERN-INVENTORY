import React, {Fragment, useEffect} from 'react';
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {CreateExpenseTypeRequest, ExpenseTypeDetailsByIdRequest} from "../../apiRequest/ExpenseTypeApiRequest.js";
import store from "../../redux/store/Store.js";
import {setExpenseTypeFormValue, setExpenseTypeFormValueReset} from "../../redux/sate-slice/ExpenseType-slice.js";
import {IsEmpty} from "../../helper/FormHelper.js";
import toast from "react-hot-toast";
import {BrandDetailsByIdRequest, CreateBrandRequest} from "../../apiRequest/BrandApiRequest.js";
import {setBrandFormValue, setBrandFormValueReset} from "../../redux/sate-slice/Brand-slice.js";

const BrandCreateUpdate = () => {
    let FormValue = useSelector((state) => (state.brand.FormValue));
    let navigate = useNavigate();
    let params = new URLSearchParams(window.location.search)
    let id = params.get("id")
    useEffect(() => {
        if (id !== null) {
            (async () => {
                await BrandDetailsByIdRequest(id);
            })()
        } else {
            store.dispatch(setBrandFormValueReset())
        }
    }, [id]);
    const SaveChange = async () => {
        if (IsEmpty(FormValue.Name)) {
            toast.error("Brand Name Required !")
        } else {
            if (await CreateBrandRequest(FormValue, id)) {
                navigate("/brand-list")
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
                                    <h5>Save Brand</h5>
                                    <hr className="bg-light"/>
                                    <div className="col-4 p-2">
                                        <label className="form-label">Brand Name</label>
                                        <input onChange={(e) => {
                                            store.dispatch(setBrandFormValue({
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

export default BrandCreateUpdate;