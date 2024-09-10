import React, {useRef} from 'react';
import {useNavigate} from "react-router-dom";
import {IsEmail, IsEmpty} from "../../helper/FormHelper.js";
import toast from "react-hot-toast";
import {RegistrationRequest} from "../../apiRequest/UserApiRequest.js";

const Registration = () => {
    let emailRef, firstNameRef, lastNameRef, mobileRef, passwordRef = useRef()
    let navigate = useNavigate()
    const onRegistration = async () => {
        let email = emailRef.value
        let firstName = firstNameRef.value
        let lastName = lastNameRef.value
        let mobile = mobileRef.value
        let password = passwordRef.value
        let photo = "https://image.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-260nw-2281862025.jpg"
        if(!IsEmail(email)){
            toast.error("Valid Email Address Required!")
        }
        else if (IsEmpty(firstName)){
            toast.error("First Name Required!")
        }
        else if (IsEmpty(lastName)){
            toast.error("Last Name Required!")
        }
        else if (IsEmpty(mobile)){
            toast.error("Mobile Number Required!")
        }
        else if (IsEmpty(password)){
            toast.error("A Strong Password Required!")
        }
        else{
            let result = await RegistrationRequest(email, firstName, lastName, mobile, password, photo)
            if (result === true){
                navigate("/login")
            }
        }
    }

    return (
        <div>
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-10 col-lg-10 center-screen">
                        <div className="card w-100">
                            <div className="card-body">
                                <h4 className="text-start">Sign Up</h4>
                                <hr/>
                                <div className="row m-0 p-0">
                                    <div className="col-md-4 text-start p-2">
                                        <label>Email Address</label>
                                        <input ref={(input) => emailRef = input} placeholder="User Email"
                                               className="form-control" type="email"/>
                                    </div>
                                    <div className="col-md-4 text-start p-2">
                                        <label>First Name</label>
                                        <input ref={(input) => firstNameRef = input} placeholder="First Name"
                                               className="form-control" type="text"/>
                                    </div>
                                    <div className="col-md-4 text-start p-2">
                                        <label>Last Name</label>
                                        <input ref={(input) => lastNameRef = input} placeholder="Last Name"
                                               className="form-control" type="text"/>
                                    </div>
                                    <div className="col-md-4 text-start p-2">
                                        <label>Mobile Number</label>
                                        <input ref={(input) => mobileRef = input} placeholder="Mobile"
                                               className="form-control" type="tel"/>
                                    </div>
                                    <div className="col-md-4 text-start p-2">
                                        <label>Password</label>
                                        <input ref={(input) => passwordRef = input} placeholder="User Password"
                                               className="form-control" type="password"/>
                                    </div>

                                </div>
                                <div className="row m-0  p-0">
                                    <div className="col-md-4 text-start p-2">
                                        <button onClick={onRegistration}
                                                className="btn w-100 mt-2 btn-success">Complete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;