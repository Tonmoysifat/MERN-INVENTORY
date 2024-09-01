import React, {Fragment, useRef} from 'react';
import {Link} from "react-router-dom";
import {IsEmail, IsEmpty} from "../../helper/FormHelper.js";
import toast from "react-hot-toast";
import {LoginRequest} from "../../apiRequest/UserApiRequest.js";

const Login = () => {
    let emailRef, passRef = useRef()
    const SubmitLogin = async () => {
        let email = emailRef.value
        let password = passRef.value
        if (!IsEmail(email)) {
            toast.error("Valid Email Address Required!")
        } else if (IsEmpty(password)) {
            toast.error("Password Required!")
        } else {
            let result = await LoginRequest(email, password)
            if (result) {
                window.location.href = "/"
            }
        }
    }
    return (
        <Fragment>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-7 col-lg-6 center-screen">
                        <div className="card w-90  p-4">
                            <div className="card-body">
                                <h3>SIGN IN</h3>
                                <br/>
                                <input ref={(input) => emailRef = input} placeholder="User Email"
                                       className="form-control" type="email"/>
                                <br/>
                                <input ref={(input) => passRef = input} placeholder="User Password"
                                       className="form-control" type="password"/>
                                <br/>
                                <button onClick={SubmitLogin} className="btn btn-success w-100 animated ">Next</button>
                                <div className="float-end mt-3">
                                    <span>
                                        <Link className="text-center ms-3 h6" to="/registration">Sign Up</Link>
                                        <span className="ms-1">|</span>
                                        <Link className="text-center ms-3 h6" to="/send-otp">Forget Password</Link>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Login;