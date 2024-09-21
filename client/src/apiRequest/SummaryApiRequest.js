import store from "../redux/store/Store.js";
import {hideLoader, showLoader} from "../redux/sate-slice/Setting-slice.js";
import axios from "axios";
import toast from "react-hot-toast";
import {
    setExpenseSummary,
    setExpenseTotal,
    setPurchaseSummary,
    setPurchaseTotal, setReturnSummary, setReturnTotal, setSaleSummary, setSaleTotal
} from "../redux/sate-slice/Summary-slice.js";

export const ExpenseSummaryRequest = async () => {
    try {
        store.dispatch(showLoader())
        let URL = `/api/ExpenseSummary`
        const result = await axios.get(URL)
        store.dispatch(hideLoader())
        if (result.status === 200 && result.data["status"] === "Success") {
            if (result.data["data"][0]["Total"].length > 0 && result.data["data"][0]["last30Days"].length > 0) {
                store.dispatch(setExpenseSummary(result.data['data'][0]["last30Days"]))
                store.dispatch(setExpenseTotal(result.data['data'][0]["Total"][0]["TotalAmount"]))
            } else {
                store.dispatch(setExpenseSummary([]))
                store.dispatch(setExpenseTotal(0))
                // toast.error("No Data Found")
            }
        } else {
            toast.error("Something Went Wrong")
        }
    } catch (e) {
        toast.error("Something Went Wrong")
        store.dispatch(hideLoader())
    }
}

export const PurchaseSummaryRequest = async () => {
    try {
        store.dispatch(showLoader())
        let URL = `/api/PurchaseSummary`
        const result = await axios.get(URL)
        store.dispatch(hideLoader())
        if (result.status === 200 && result.data["status"] === "Success") {
            if (result.data["data"][0]["Total"].length > 0 && result.data["data"][0]["last30Days"].length > 0) {
                store.dispatch(setPurchaseSummary(result.data['data'][0]["last30Days"]))
                store.dispatch(setPurchaseTotal(result.data['data'][0]["Total"][0]["TotalAmount"]))
            } else {
                store.dispatch(setPurchaseSummary([]))
                store.dispatch(setPurchaseTotal(0))
                // toast.error("No Data Found")
            }
        } else {
            toast.error("Something Went Wrong")
        }
    } catch (e) {
        toast.error("Something Went Wrong")
        store.dispatch(hideLoader())
    }
}

export const SaleSummaryRequest = async () => {
    try {
        store.dispatch(showLoader())
        let URL = `/api/SaleSummary`
        const result = await axios.get(URL)
        store.dispatch(hideLoader())
        if (result.status === 200 && result.data["status"] === "Success") {
            if (result.data["data"][0]["Total"].length > 0 && result.data["data"][0]["last30Days"].length > 0) {
                store.dispatch(setSaleSummary(result.data['data'][0]["last30Days"]))
                store.dispatch(setSaleTotal(result.data['data'][0]["Total"][0]["TotalAmount"]))
            } else {
                store.dispatch(setSaleSummary([]))
                store.dispatch(setSaleTotal(0))
                // toast.error("No Data Found")
            }

        } else {
            toast.error("Something Went Wrong")
        }
    } catch (e) {
        toast.error(" Went Wrong")
        store.dispatch(hideLoader())
    }
}

export const ReturnSummaryRequest = async () => {
    try {
        store.dispatch(showLoader())
        let URL = `/api/ReturnSummary`
        const result = await axios.get(URL)
        store.dispatch(hideLoader())
        if (result.status === 200 && result.data["status"] === "Success") {
            if (result.data["data"][0]["Total"].length > 0 && result.data["data"][0]["last30Days"].length > 0) {
                store.dispatch(setReturnSummary(result.data['data'][0]["last30Days"]))
                store.dispatch(setReturnTotal(result.data['data'][0]["Total"][0]["TotalAmount"]))
            } else {
                store.dispatch(setReturnSummary([]))
                store.dispatch(setReturnTotal(0))
                // toast.error("No Data Found")
            }
        } else {
            toast.error("Something Went Wrong")
        }
    } catch (e) {
        toast.error("Something Went Wrong")
        store.dispatch(hideLoader())
    }
}