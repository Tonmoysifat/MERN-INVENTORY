import React, {Fragment, useEffect} from 'react';
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import store from "../../redux/store/Store.js";
import {IsEmail, IsEmpty} from "../../helper/FormHelper.js";
import toast from "react-hot-toast";
import {CreateSupplierRequest, SupplierDetailsByIdRequest} from "../../apiRequest/SupplierApiRequest.js";
import {setSupplierFormValue, setSupplierFormValueReset} from "../../redux/sate-slice/Supplier-slice.js";

const SupplierCreateUpdate = () => {
    let FormValue = useSelector((state) => (state.supplier.FormValue));
    let navigate = useNavigate();
    let params = new URLSearchParams(window.location.search)
    let id = params.get("id")
    useEffect(() => {
        if (id !== null) {
            (async () => {
                await SupplierDetailsByIdRequest(id);
            })()
        }
        else {
            store.dispatch(setSupplierFormValueReset())
        }
    }, [id]);
    const SaveChange = async () => {
        if (IsEmpty(FormValue.SupplierName)) {
            toast.error("Customer Name Required !")
        } else if (IsEmpty(FormValue.SupplierPhone)) {
            toast.error("Customer Phone  Number Required !")
        } else if (!IsEmail(FormValue.SupplierEmail)) {
            toast.error("Valid Email Address Required !")
        } else if (IsEmpty(FormValue.SupplierAddress)) {
            toast.error("Valid Address Required !")
        } else {
            if (await CreateSupplierRequest(FormValue, id)) {
                navigate("/supplier-list")
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
                                    <h5>Save Supplier</h5>
                                    <hr className="bg-light"/>

                                    <div className="col-4 p-2">
                                        <label className="form-label">Supplier Name</label>
                                        <input onChange={(e) => {
                                            store.dispatch(setSupplierFormValue({
                                                fieldName: "SupplierName",
                                                value: e.target.value
                                            }))
                                        }} className="form-control form-control-sm"
                                               value={ FormValue["SupplierName"] } type="text"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label className="form-label">Mobile No</label>
                                        <input onChange={(e) => {
                                            store.dispatch(setSupplierFormValue({
                                                fieldName: "SupplierPhone",
                                                value: e.target.value
                                            }))
                                        }} className="form-control form-control-sm"
                                               value={FormValue["SupplierPhone"]} type="text"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label className="form-label">Email </label>
                                        <input onChange={(e) => {
                                            store.dispatch(setSupplierFormValue({
                                                fieldName: "SupplierEmail",
                                                value: e.target.value
                                            }))
                                        }} className="form-control form-control-sm"
                                               value={FormValue["SupplierEmail"]} type="text"/>
                                    </div>
                                    <div className="col-12 p-2">
                                        <label className="form-label">Address</label>
                                        <textarea onChange={(e) => {
                                            store.dispatch(setSupplierFormValue({
                                                fieldName: "SupplierAddress",
                                                value: e.target.value
                                            }))
                                        }} className="form-control form-control-sm"
                                                  value={FormValue["SupplierAddress"]} rows={4}/>
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

export default SupplierCreateUpdate;