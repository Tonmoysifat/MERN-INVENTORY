import store from "../redux/store/Store.js";
import {hideLoader, showLoader} from "../redux/sate-slice/Setting-slice.js";
import axios from "axios";
import toast from "react-hot-toast";
import {setEmail, setOTP, setUserDetails} from "../helper/SessoinHelper.js";
import {setUser} from "../redux/sate-slice/User-slice.js";

export const RegistrationRequest = async (email, firstName, lastName, mobile, password, photo) => {
    try {
        store.dispatch(showLoader())
        let URL = `/api/Registration`
        let postBody = {
            email: email,
            firstName: firstName,
            lastName: lastName,
            mobile: mobile,
            password: password,
            photo:photo
        }
        let res = await axios.post(URL, postBody)
        store.dispatch(hideLoader())
        if (res.status === 200) {
            if (res.data["status"] === "Fail") {
                if (res.data["data"]["keyPattern"]["email"] === 1) {
                    toast.error("This Email is associated with another account. Try with another Email")
                    return false
                } else {
                    toast.error("Something went Wrong")
                    return false
                }
            } else {
                toast.success("Registration Successfully Completed")
                return true
            }
        } else {
            toast.error("Something went Wrong")
            return false
        }
    } catch (e) {
        store.dispatch(hideLoader())
        toast.error("Something went Wrong")
        return false
    }

}

export const LoginRequest = async (email, password) => {
    try {
        store.dispatch(showLoader())
        let URL = `/api/Login`
        let postBody = {
            email: email,
            password: password
        }
        let res = await axios.post(URL, postBody)
        if (res.data["status"]==="Success"){
            setUserDetails(res.data["data"])
            toast.success("Welcome To Dashboard")
            store.dispatch(hideLoader())
            return true
        }
        else if (res.data["status"]==="unauthorized"){
            store.dispatch(hideLoader())
            toast.error("Invalid Email or Password")
            return false
        }
    }
    catch (e) {
        store.dispatch(hideLoader())
        toast.error("Something Went Wrong")
        return false
    }
}

export const LogoutRequest = async ()=>{
    try {
        store.dispatch(showLoader())
        let URL = `/api/Logout`
        let res = await axios.get(URL)
        store.dispatch(hideLoader())
        if(res.status===200){
            toast.success(res.data["message"])
        }
        else {
            toast.error("Something went Wrong")
        }
    }
    catch (e) {
        store.dispatch(hideLoader())
        toast.error("Something went Wrong")
    }
}

export const ProfileDetailsRequest = async ()=>{
    try {
        store.dispatch(showLoader())
        let URL = `/api/ProfileDetails`
        let res = await axios.get(URL)
        store.dispatch(hideLoader())
        if(res.status===200){
            store.dispatch(setUser(res.data["data"][0]))
        }
        else {
            toast.error("Something went Wrong")
        }
    }
    catch (e) {
        store.dispatch(hideLoader())
        toast.error("Something went Wrong")
    }
}

export const ProfileUpdateRequest = async (email, firstName, lastName, mobile, password, photo) => {
    try {
        store.dispatch(showLoader())
        let URL = `/api/ProfileUpdate`
        let postBody = {
            email: email,
            firstName: firstName,
            lastName: lastName,
            mobile: mobile,
            password: password,
            photo:photo
        }
        let userDetails = {
            email: email,
            firstName: firstName,
            lastName: lastName,
            mobile: mobile,
            password: password,
            photo:photo
        }
        let res = await axios.post(URL, postBody)
        store.dispatch(hideLoader())
        if (res.status === 200) {
            toast.success("Updated Successfully")
            setUserDetails(userDetails)
            return true
        } else {
            toast.error("Something went Wrong")
            return false
        }
    } catch (e) {
        store.dispatch(hideLoader())
        toast.error("Something went Wrong")
        return false
    }

}

export const RecoverVerifyEmailRequest = async (email)=>{
    try {
        store.dispatch(showLoader())
        let URL = `/api/RecoverVerifyEmail/${email}`
        let res = await axios.get(URL)
        store.dispatch(hideLoader())
        if(res.status===200){
            if (res.data["status"]==="Fail"){
                toast.error("No User Found")
                return false
            }
            else {
                setEmail(email)
                toast.success("A 6 Digit verification code has been sent to your email address.")
                return true
            }
        }
        else {
            toast.error("Something went Wrong")
            return false
        }
    }
    catch (e) {
        store.dispatch(hideLoader())
        toast.error("Something went Wrong")
        return false
    }
}

export const RecoverVerifyOTPRequest = async (email,otp)=>{
    try {
        store.dispatch(showLoader())
        let URL = `/api/RecoverVerifyOTP/${email}/${otp}`
        let res = await axios.get(URL)
        store.dispatch(hideLoader())
        if(res.status===200){
            if (res.data["status"]==="Fail"){
                toast.error("Invalid OTP")
                return false
            }
            else {
                setOTP(otp)
                toast.success("Verified")
                return true
            }
        }
        else {
            toast.error("Something went Wrong")
            return false
        }
    }
    catch (e) {
        store.dispatch(hideLoader())
        toast.error("Something went Wrong")
        return false
    }
}

export const RecoverResetPassRequest = async (email,otp,NewPassword,ConfirmPassword)=>{
    try {
        store.dispatch(showLoader())
        let URL = `/api/RecoverResetPass`
        let postBody = {
            email: email,
            otp:otp,
            NewPassword:NewPassword,
            ConfirmPassword:ConfirmPassword
        }
        let res = await axios.post(URL,postBody)
        store.dispatch(hideLoader())
        if(res.status===200){
            if (res.data["status"]==="Fail"){
                toast.error(res.data["message"])
                return false
            }
            else {
                setOTP(otp)
                toast.success(res.data["message"])
                return true
            }
        }
        else {
            toast.error("Something went Wrong")
            return false
        }
    }
    catch (e) {
        store.dispatch(hideLoader())
        toast.error("Something went Wrong")
        return false
    }
}