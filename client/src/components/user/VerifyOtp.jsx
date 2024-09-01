import React, {Fragment, useState} from 'react';
import ReactCodeInput from "react-code-input";
import {RecoverVerifyOTPRequest} from "../../apiRequest/UserApiRequest.js";
import {getEmail} from "../../helper/SessoinHelper.js";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";

const VerifyOtp = () => {
        const [otp, SetOTP] = useState("")
        let navigate = useNavigate()
        let defaultInputStyle = {
            fontFamily: "monospace",
            MozAppearance: "textfield",
            margin: "4px",
            paddingLeft: "8px",
            width: "45px",
            borderRadius: '3px',
            height: "45px",
            fontSize: "32px",
            border: '1px solid lightskyblue',
            boxSizing: "border-box",
            color: "black",
            backgroundColor: "white",
            borderColor: "lightgrey"
        }

        const SubmitOtp = async () => {
            if (otp.length === 6) {
                let result = await RecoverVerifyOTPRequest(getEmail(), otp)
                if (result === true) {
                    navigate("/new-password")
                }
            } else {
                toast.error("Enter 6 Digit Code")
            }
        }


        return (
            <Fragment>
                <div className="container">
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-7 col-lg-6 center-screen">
                            <div className="card w-90">
                                <div className="card-body">
                                    <h4>OTP VERIFICATION </h4>
                                    <p>A 6 Digit verification code has been sent to your email address. </p>
                                    <ReactCodeInput onChange={(value) => SetOTP(value)} inputStyle={defaultInputStyle}
                                                    fields={6}/>
                                    <br/> <br/>
                                    <button onClick={SubmitOtp} className="btn w-100 btn-success">Next</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    };

export default VerifyOtp;