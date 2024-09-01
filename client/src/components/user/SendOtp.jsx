import React, {Fragment, useRef} from 'react';
import {IsEmail, IsEmpty} from "../../helper/FormHelper.js";
import toast from "react-hot-toast";
import {RecoverVerifyEmailRequest} from "../../apiRequest/UserApiRequest.js";
import {useNavigate} from "react-router-dom";

const SendOtp = () => {
    let navigate = useNavigate()
    let emailRef = useRef()
    const SendOtp = async () => {
        let email = emailRef.value
        if (!IsEmail(email)) {
            toast.error("Valid Email Address Required!")
        } else {
            let result = await RecoverVerifyEmailRequest(email)
            if (result===true) {
                navigate("/verify-otp")
            }
        }
    }
    return (
        <Fragment>
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-7 col-lg-6 center-screen">
                        <div className="card w-90">
                            <div className="card-body text-start">
                                <h4>EMAIL ADDRESS</h4>
                                <hr/>
                                <label>Your email address</label>
                                <input ref={(input)=>emailRef=input}  placeholder="User Email" className="form-control" type="email"/>
                                <br/>
                                <button onClick={SendOtp} className="btn w-100 btn-success">Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default SendOtp;