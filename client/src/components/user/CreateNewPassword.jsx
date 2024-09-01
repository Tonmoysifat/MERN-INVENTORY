import React, {Fragment, useRef} from 'react';
import {IsEmpty} from "../../helper/FormHelper.js";
import toast from "react-hot-toast";
import {LoginRequest, RecoverResetPassRequest} from "../../apiRequest/UserApiRequest.js";
import {getEmail, getOTP} from "../../helper/SessoinHelper.js";
import {useNavigate} from "react-router-dom";

const CreateNewPassword = () => {
    let passwordRef, confirmPasswordRef = useRef()
    let navigate = useNavigate()
    const ResetPass = async () => {
        let password = passwordRef.value
        let confirmPassword = confirmPasswordRef.value
        if (IsEmpty(password)) {
            toast.error("Password Required!")
        } else if (IsEmpty(confirmPassword)) {
            toast.error("Confirm password Required!")
        } else {
            let result = await RecoverResetPassRequest(getEmail(), getOTP(), password, confirmPassword)
            if (result === true) {
                navigate("/login")
            }
        }
    }
    return (
        <Fragment>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-7 text-start col-lg-6 center-screen">
                        <div className="card w-90 p-4">
                            <div className="card-body">
                                <h4>SET NEW PASSWORD</h4>
                                <br/>
                                <label>Your email address</label>
                                <input readOnly={true} value={getEmail()} placeholder="User Email"
                                       className="form-control animated fadeInUp" type="email"/>
                                <br/>
                                <label>New Password</label>
                                <input ref={(input) => passwordRef = input} placeholder="New Password"
                                       className="form-control animated fadeInUp" type="password"/>
                                <br/>
                                <label>Confirm Password</label>
                                <input ref={(input) => confirmPasswordRef = input} placeholder="Confirm Password"
                                       className="form-control animated fadeInUp" type="password"/>
                                <br/>
                                <button onClick={ResetPass} className="btn w-100 btn-success">Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default CreateNewPassword;