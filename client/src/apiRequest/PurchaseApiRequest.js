import store from "../redux/store/Store.js";
import {hideLoader, showLoader} from "../redux/sate-slice/Setting-slice.js";
import axios from "axios";
import {
    setProductDropDown, setPurchaseFormValueReset,
    setPurchaseList,
    setPurchaseListTotal,
    setSupplierDropDown
} from "../redux/sate-slice/Purchase-slice.js";
import toast from "react-hot-toast";


export const PurchaseListRequest = async (pageNo, perPage, SearchArray) => {
    try {
        store.dispatch(showLoader())
        let URL = `/api/PurchaseList/${pageNo}/${perPage}/${SearchArray}`
        let result = await axios.get(URL)
        store.dispatch(hideLoader())
        if (result.status === 200 && result.data["status"] === "Success") {
            if (result.data["data"][0]["Rows"].length > 0) {
                store.dispatch(setPurchaseList(result.data["data"][0]["Rows"]))
                store.dispatch(setPurchaseListTotal(result.data["data"][0]["Total"][0]["count"]))
            } else {
                store.dispatch(setPurchaseList([]))
                store.dispatch(setPurchaseListTotal(0))
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

export async function SupplierDropDownRequest() {
    try {
        store.dispatch(showLoader())
        let URL = `/api/SupplierDropDown`
        const result = await axios.get(URL)
        store.dispatch(hideLoader())
        if (result.status === 200 && result.data["status"] === "Success") {
            if (result.data['data'].length > 0) {
                store.dispatch(setSupplierDropDown(result.data['data']))
            } else {
                store.dispatch(setSupplierDropDown([]))
                toast.error("No Supplier Found")
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

export const CreatePurchaseRequest = async (ParentBody, ChildBody) => {
    try {
        store.dispatch(showLoader())
        let postBody = {"parent":ParentBody, "child":ChildBody}
        let URL = `/api/CreatePurchase`
        let result = await axios.post(URL, postBody)
        store.dispatch(hideLoader())
        if (result.status === 200 && result.data["status"] === "Success") {
            toast.success("Created Successfully")
            store.dispatch(setPurchaseFormValueReset())
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

export async function DeletePurchaseRequest(id) {
    try {
        store.dispatch(showLoader())
        let URL = `/api/PurchaseDelete/${id}`
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