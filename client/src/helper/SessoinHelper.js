import cookies from "js-cookie"
import {LogoutRequest} from "../apiRequest/UserApiRequest.js";

class SessoinHelper {
    getToken() {
        return cookies.get("token");
    }

    setUserDetails(UserDetails) {
        localStorage.setItem("UserDetails", JSON.stringify(UserDetails));
    }

    getUserDetails() {
        return JSON.parse(localStorage.getItem("UserDetails"));
    }

    setEmail(Email) {
        localStorage.setItem("Email", Email);
    }

    getEmail() {
        return localStorage.getItem("Email");
    }

    setOTP(OTP) {
        localStorage.setItem("OTP", OTP);
    }

    getOTP() {
        return localStorage.getItem("OTP");
    }

    removeSession = async () => {
        localStorage.clear()
        window.location.href = "/login"
    }
}

export const {getToken, setUserDetails, getUserDetails, setEmail, getEmail, setOTP, getOTP, removeSession} =
    new SessoinHelper()