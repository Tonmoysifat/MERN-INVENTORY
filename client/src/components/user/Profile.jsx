import React, {useEffect, useRef} from 'react';
import {
    ProfileDetailsRequest,
    ProfileImageUpdateRequest,
    ProfileUpdateRequest
} from "../../apiRequest/UserApiRequest.js";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getBaseUrl, IsEmail, IsEmpty} from "../../helper/FormHelper.js";
import toast from "react-hot-toast";
import store from "../../redux/store/Store.js";
import {setProfilePic} from "../../redux/sate-slice/User-slice.js";
const Profile = () => {
    let emailRef, firstNameRef, lastNameRef, mobileRef, passwordRef, userImgView = useRef();
    let navigate = useNavigate();
    useEffect(() => {
        (async () => {
            await ProfileDetailsRequest()
        })()
    }, []);

    const ProfileData = useSelector((state) => state.user.value)
    const ProfilePic = useSelector((state) => state.user.profilePic)

    // const PreviewImage = async (e) => {
    //     let imgView = userImgRef.files[0]
    //     userImgView.src = imgView
    //     console.log(imgView)
    //     getBaseUrl(imgView).then((base64Img) => {
    //         userImgView.src = base64Img
    //     })
    // }

    const PreviewImage = async (e) => {
        await getBaseUrl(e.target.files[0]).then((base64Img) => {
            userImgView.src = base64Img
        })
        const formData = new FormData();
        formData.append("file", e.target.files[0]);
        store.dispatch(setProfilePic(formData))
    }
    const UpdateMyProfile = async () => {
        let email = emailRef.value;
        let firstName = firstNameRef.value;
        let lastName = lastNameRef.value;
        let mobile = mobileRef.value;
        let password = passwordRef.value;
        if (!IsEmail(email)) {
            toast.error("Valid Email Address Required!")
        } else if (IsEmpty(firstName)) {
            toast.error("First Name Required!")
        } else if (IsEmpty(lastName)) {
            toast.error("Last Name Required!")
        } else if (IsEmpty(mobile)) {
            toast.error("Mobile Number Required!")
        } else if (IsEmpty(password)) {
            toast.error("A Strong Password Required!")
        } else {
            let result = await ProfileUpdateRequest(email, firstName, lastName, mobile, password)
            let result2 = await ProfileImageUpdateRequest(ProfilePic)
            if (result === true && result2 === true) {
                navigate("/")
            }
        }
    }
    return (
        <div className="container">
            <div className="row d-flex justify-content-center">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="container-fluid">
                                <img ref={(input) => userImgView = input} className="icon-nav-img-lg"
                                     src={ProfileData['photo'] === "" ? "https://image.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-260nw-2281862025.jpg" : ProfileData['photo']}
                                     alt=""/>
                                <hr/>
                                <div className="row">
                                    <div className="col-4 p-2">
                                        <label htmlFor="file">Change Profile Picture</label>
                                        <input id="file" name="file"
                                               onChange={PreviewImage}
                                            // ref={(input) => userImgRef = input}
                                               placeholder="Change Profile Picture"
                                               className="form-control animated fadeInUp"
                                               type="file"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label>Email Address</label>
                                        <input key={Date.now()} defaultValue={ProfileData['email']} readOnly={true}
                                               ref={(input) => emailRef = input} placeholder="User Email"
                                               className="form-control animated fadeInUp" type="email"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label>First Name</label>
                                        <input key={Date.now()} defaultValue={ProfileData['firstName']}
                                               ref={(input) => firstNameRef = input} placeholder="First Name"
                                               className="form-control animated fadeInUp" type="text"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label>Last Name</label>
                                        <input key={Date.now()} defaultValue={ProfileData['lastName']}
                                               ref={(input) => lastNameRef = input} placeholder="Last Name"
                                               className="form-control animated fadeInUp" type="text"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label>Mobile</label>
                                        <input key={Date.now()} defaultValue={ProfileData['mobile']}
                                               ref={(input) => mobileRef = input} placeholder="Mobile"
                                               className="form-control animated fadeInUp" type="mobile"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label>Password</label>
                                        <input key={Date.now()} defaultValue={ProfileData['password']}
                                               ref={(input) => passwordRef = input} placeholder="User Password"
                                               className="form-control animated fadeInUp" type="password"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <button onClick={UpdateMyProfile} className="w-100  btn btn-success">Update
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

export default Profile;