import store from "../redux/store/Store.js";
import {hideLoader, showLoader} from "../redux/sate-slice/Setting-slice.js";
import axios from "axios";
import {
    setCustomerDropDown,
    setProductDropDown, setSaleFormValueReset,
    setSaleList,
    setSaleListTotal
} from "../redux/sate-slice/Sale-slice.js";
import toast from "react-hot-toast";

export const SaleListRequest = async (pageNo, perPage, SearchArray) => {
    try {
        store.dispatch(showLoader())
        let URL = `/api/SaleList/${pageNo}/${perPage}/${SearchArray}`
        let result = await axios.get(URL)
        store.dispatch(hideLoader())
        if (result.status === 200 && result.data["status"] === "Success") {
            if (result.data["data"][0]["Rows"].length > 0) {
                store.dispatch(setSaleList(result.data["data"][0]["Rows"]))
                store.dispatch(setSaleListTotal(result.data["data"][0]["Total"][0]["count"]))
            } else {
                store.dispatch(setSaleList([]))
                store.dispatch(setSaleListTotal(0))
                toast.error("No Data Found")
            }
        } else {
            toast.error("Something Went Wrong")
        }
    } catch (e) {
        store.dispatch(hideLoader())
        toast.error("Something went Wrong")
    }
}

export async function CustomerDropDownRequest() {
    try {
        store.dispatch(showLoader())
        let URL = `/api/CustomerDropDown`
        const result = await axios.get(URL)
        store.dispatch(hideLoader())
        if (result.status === 200 && result.data["status"] === "Success") {
            if (result.data['data'].length > 0) {
                store.dispatch(setCustomerDropDown(result.data['data']))
            } else {
                store.dispatch(setCustomerDropDown([]))
                toast.error("No Customer Found")
            }
        } else {
            toast.error("Something Went Wrong")
        }
    } catch (e) {
        toast.error("Something Went Wrong")
        store.dispatch(hideLoader())
    }
}

export async function ProductDropDownRequest() {
    try {
        store.dispatch(showLoader())
        let URL = `/api/ProductDropDown`
        const result = await axios.get(URL)
        store.dispatch(hideLoader())
        if (result.status === 200 && result.data["status"] === "Success") {
            if (result.data['data'].length > 0) {
                store.dispatch(setProductDropDown(result.data['data']))
            } else {
                store.dispatch(setProductDropDown([]))
                toast.error("No Product Found")
            }
        } else {
            toast.error("Something Went Wrong")
        }
    } catch (e) {
        toast.error("Something Went Wrong")
        store.dispatch(hideLoader())
    }
}

export const CreateSaleRequest = async (ParentBody, ChildBody) => {
    try {
        store.dispatch(showLoader())
        let postBody = {"parent":ParentBody, "child":ChildBody}
        let URL = `/api/CreateSale`
        let result = await axios.post(URL, postBody)
        store.dispatch(hideLoader())
        if (result.status === 200 && result.data["status"] === "Success") {
            toast.success("Created Successfully")
            store.dispatch(setSaleFormValueReset())
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

export async function DeleteSaleRequest(id) {
    try {
        store.dispatch(showLoader())
        let URL = `/api/SaleDelete/${id}`
        const result = await axios.get(URL)
        store.dispatch(hideLoader())
        if (result.status === 200 && result.data['status'] === "Success") {
            toast.success("Deleted Successful");
            return true
        } else {
            toast.error("Request Fail! Try Again")
            return false;
        }
    } catch (e) {
        toast.error("Something Went Wrong")
        store.dispatch(hideLoader())
        return false
    }
}