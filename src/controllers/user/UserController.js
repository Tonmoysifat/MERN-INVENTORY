const UserCreateService = require("../../services/user/UserCreateService");
const userModel = require("../../models/users/userModel");
const UserDetailsService = require("../../services/user/UserDetailsService");
const UserLoginService = require("../../services/user/UserLoginService");
const UserResetPassService = require("../../services/user/UserResetPassService");
const otpsModel = require("../../models/users/otpsModel");
const UserUpdateService = require("../../services/user/UserUpdateService");
const UserVerifyEmailService = require("../../services/user/UserVerifyEmailService");
const UserVerifyOtpService = require("../../services/user/UserVerifyOtpService");
const UserProImgUpdateService = require("../../services/user/UserProImgUpdateService");

exports.Registration = async (req, res) => {
    let result = await UserCreateService(req, userModel)
    res.status(200).json(result)
}
exports.ProfileDetails = async (req, res) => {
    let result = await UserDetailsService(req, userModel)
    res.status(200).json(result)
}
exports.Login = async (req, res) => {
    let result = await UserLoginService(req, userModel)
    if (result["status"]==="Success") {
        let cookieOptions = {
            expires: new Date(Date.now() + 480 * 60 * 60 * 1000),
            httponly: false
        }
        res.cookie("token", result["token"], cookieOptions)
        res.status(200).json(result)
    } else {
        res.status(200).json(result)
    }

}

exports.Logout = async (req, res) => {
    let cookieOptions = {
        expires: new Date(Date.now() - 480 * 60 * 60 * 1000),
        httponly: false
    }
    res.cookie("token", "", cookieOptions)
    res.status(200).json({status: "Success", message: "Logout Successfully"})
}

exports.RecoverResetPass = async (req, res) => {
    let result = await UserResetPassService(req, userModel, otpsModel)
    res.status(200).json(result)
}
exports.ProfileUpdate = async (req, res) => {
    let result = await UserUpdateService(req, userModel)
    res.status(200).json(result)
}
exports.ProfileImageUpdate = async (req, res) => {
    let result = await UserProImgUpdateService(req, userModel)
    res.status(200).json(result)
}
exports.RecoverVerifyEmail = async (req, res) => {
    let result = await UserVerifyEmailService(req, userModel, otpsModel)
    res.status(200).json(result)
}
exports.RecoverVerifyOTP = async (req, res) => {
    let result = await UserVerifyOtpService(req, otpsModel)
    res.status(200).json(result)
}
