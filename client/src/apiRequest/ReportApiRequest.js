import store from "../redux/store/Store.js";
import {hideLoader, showLoader} from "../redux/sate-slice/Setting-slice.js";
import axios from "axios";
import {setBrandFormValue} from "../redux/sate-slice/Brand-slice.js";
import toast from "react-hot-toast";
import {
    setExpensesByDateList,
    setPurchaseByDateList,
    setReturnByDateList,
    setSalesByDateList
} from "../redux/sate-slice/Report-slice.js";

export const ExpensesByDateRequest = async (FromDate, ToDate) => {
    try {
        store.dispatch(showLoader())
        // debugger
        let postBody = {
            "FromDate": FromDate,
            "ToDate": ToDate
        };
        let URL = `/api/ExpenseByDate`
        let result = await axios.post(URL, postBody)
        store.dispatch(hideLoader())
        if (result.status === 200 && result.data["status"] === "Success") {
            store.dispatch(setExpensesByDateList(result.data["data"]));
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

export const PurchaseByDateRequest = async (FromDate, ToDate) => {
    try {
        store.dispatch(showLoader())
        let postBody = {
            "FromDate": FromDate,
            "ToDate": ToDate
        };
        let URL = `/api/PurchaseByDate`
        let result = await axios.post(URL, postBody)
        store.dispatch(hideLoader())
        if (result.status === 200 && result.data["status"] === "Success") {
            store.dispatch(setPurchaseByDateList(result.data["data"]));
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

export const SalesByDateRequest = async (FromDate, ToDate) => {
    try {
        store.dispatch(showLoader())
        let postBody = {
            "FromDate": FromDate,
            "ToDate": ToDate
        };
        let URL = `/api/SaleByDate`
        let result = await axios.post(URL, postBody)
        store.dispatch(hideLoader())
        if (result.status === 200 && result.data["status"] === "Success") {
            store.dispatch(setSalesByDateList(result.data["data"]));
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

export const ReturnByDateRequest = async (FromDate, ToDate) => {
    try {
        store.dispatch(showLoader())
        let postBody = {
            "FromDate": FromDate,
            "ToDate": ToDate
        };
        let URL = `/api/ReturnByDate`
        let result = await axios.post(URL, postBody)
        store.dispatch(hideLoader())
        if (result.status === 200 && result.data["status"] === "Success") {
            store.dispatch(setReturnByDateList(result.data["data"]));
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