import React, {Fragment} from 'react';
import {setCustomerFormValue} from "../../redux/sate-slice/Customer-slice.js";
import store from "../../redux/store/Store.js";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import {IsEmail, IsEmpty} from "../../helper/FormHelper.js";
import {CreateCustomerRequest} from "../../apiRequest/CustomerApiRequest.js";

const CustomerCreateUpdate = () => {
    let FormValue=useSelector((state)=>(state.customer.FormValue));
    let navigate=useNavigate();
    const SaveChange = async () => {
        if(IsEmpty(FormValue.CustomerName)){
            toast.error("Customer Name Required !")
        }
        else if(IsEmpty(FormValue.CustomerPhone)){
            toast.error("Customer Phone  Number Required !")
        }
        else if(!IsEmail(FormValue.CustomerEmail)){
            toast.error("Valid Email Address Required !")
        }
        else if(IsEmpty(FormValue.CustomerAddress)){
            toast.error("Valid Address Required !")
        }
        else {
            if(await CreateCustomerRequest(FormValue)){
                navigate("/customer-list")
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
                                    <h5 >Save Customer</h5>
                                    <hr className="bg-light"/>

                                    <div className="col-4 p-2">
                                        <label className="form-label">Customer Name</label>
                                        <input onChange={(e)=>{store.dispatch(setCustomerFormValue({fieldName:"CustomerName",value:e.target.value}))}} className="form-control form-control-sm" type="text"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label className="form-label">Mobile No</label>
                                        <input onChange={(e)=>{store.dispatch(setCustomerFormValue({fieldName:"CustomerPhone",value:e.target.value}))}} className="form-control form-control-sm" type="text"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label className="form-label">Email </label>
                                        <input onChange={(e)=>{store.dispatch(setCustomerFormValue({fieldName:"CustomerEmail",value:e.target.value}))}} className="form-control form-control-sm" type="text"/>
                                    </div>
                                    <div className="col-12 p-2">
                                        <label className="form-label">Address</label>
                                        <textarea onChange={(e)=>{store.dispatch(setCustomerFormValue({fieldName:"CustomerAddress",value:e.target.value}))}} className="form-control form-control-sm" rows={4}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4 p-2">
                                        <button onClick={SaveChange} className="btn btn-sm my-3 btn-success">Save Change</button>
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

export default CustomerCreateUpdate;