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
        let URL = `https://mern-inventory.vercel.app/api/ExpenseSummary`
        const result = await axios.get(URL)
        store.dispatch(hideLoader())
        if (result.status === 200 && result.data["status"] === "Success") {
                store.dispatch(setExpenseSummary(result.data['data'][0]["last30Days"]))
                store.dispatch(setExpenseTotal(result.data['data'][0]["Total"][0]["TotalAmount"]))

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
        let URL = `https://mern-inventory.vercel.app/api/PurchaseSummary`
        const result = await axios.get(URL)
        store.dispatch(hideLoader())
        if (result.status === 200 && result.data["status"] === "Success") {
            store.dispatch(setPurchaseSummary(result.data['data'][0]["last30Days"]))
            store.dispatch(setPurchaseTotal(result.data['data'][0]["Total"][0]["TotalAmount"]))

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
        let URL = `https://mern-inventory.vercel.app/api/SaleSummary`
        const result = await axios.get(URL)
        store.dispatch(hideLoader())
        if (result.status === 200 && result.data["status"] === "Success") {
            store.dispatch(setSaleSummary(result.data['data'][0]["last30Days"]))
            store.dispatch(setSaleTotal(result.data['data'][0]["Total"][0]["TotalAmount"]))

        } else {
            toast.error("Something Went Wrong")
        }
    } catch (e) {
        toast.error("Something Went Wrong")
        store.dispatch(hideLoader())
    }
}

export const ReturnSummaryRequest = async () => {
    try {
        store.dispatch(showLoader())
        let URL = `https://mern-inventory.vercel.app/api/ReturnSummary`
        const result = await axios.get(URL)
        store.dispatch(hideLoader())
        if (result.status === 200 && result.data["status"] === "Success") {
            store.dispatch(setReturnSummary(result.data['data'][0]["last30Days"]))
            store.dispatch(setReturnTotal(result.data['data'][0]["Total"][0]["TotalAmount"]))

        } else {
            toast.error("Something Went Wrong")
        }
    } catch (e) {
        toast.error("Something Went Wrong")
        store.dispatch(hideLoader())
    }
}