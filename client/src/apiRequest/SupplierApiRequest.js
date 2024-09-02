import store from "../redux/store/Store.js";
import {hideLoader, showLoader} from "../redux/sate-slice/Setting-slice.js";
import axios from "axios";
import {
    setSupplierFormValue,
    setSupplierFormValueReset,
    setSupplierList,
    setSupplierListTotal
} from "../redux/sate-slice/Supplier-slice.js";
import toast from "react-hot-toast";


export const SupplierListRequest = async (pageNo, perPage, SearchArray) => {
    try {
        store.dispatch(showLoader())
        let URL = `/api/SupplierList/${pageNo}/${perPage}/${SearchArray}`
        let result = await axios.get(URL)
        store.dispatch(hideLoader())
        if (result.status === 200 && result.data["status"] === "Success") {
            if (result.data["data"][0]["Rows"].length > 0) {
                store.dispatch(setSupplierList(result.data["data"][0]["Rows"]))
                store.dispatch(setSupplierListTotal(result.data["data"][0]["Total"][0]["count"]))
            } else {
                store.dispatch(setSupplierList([]))
                store.dispatch(setSupplierListTotal(0))
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

export const CreateSupplierRequest = async (postBody, id) => {
    try {
        store.dispatch(showLoader())
        let URL = `/api/CreateSupplier`
        if (id !== null) {
            URL = `/api/UpdateSupplier/${id}`
        }
        let result = await axios.post(URL, postBody)
        store.dispatch(hideLoader())
        if (result.status === 200 && result.data["status"] === "Success") {
            if (id !== null) {
                toast.success("Updated Successfully")
            } else {
                toast.success("Created Successfully")
            }
            store.dispatch(setSupplierFormValueReset())
            return true
        } else if (result.status === 200 && result.data["status"] === "Fail") {
            if (result.data["data"]["keyPattern"]["SupplierPhone"] === 1) {
                toast.error("This Phone Number is associated with another account. Try with another Number")
                return false
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

export const SupplierDetailsByIdRequest = async (id) => {
    try {
        store.dispatch(showLoader())
        let URL = `/api/SupplierDetailsById/${id}`
        let result = await axios.get(URL)
        store.dispatch(hideLoader())
        if (result.status === 200 && result.data["status"] === "Success") {
            store.dispatch(setSupplierFormValue({
                fieldName: "SupplierName",
                value: result.data["data"][0]["SupplierName"]
            }));
            store.dispatch(setSupplierFormValue({
                fieldName: "SupplierPhone",
                value: result.data["data"][0]["SupplierPhone"]
            }));
            store.dispatch(setSupplierFormValue({
                fieldName: "SupplierEmail",
                value: result.data["data"][0]["SupplierEmail"]
            }));
            store.dispatch(setSupplierFormValue({
                fieldName: "SupplierAddress",
                value: result.data["data"][0]["SupplierAddress"]
            }));
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

export async function DeleteSupplierRequest(id) {
    try {
        store.dispatch(showLoader())
        let URL = `/api/DeleteSupplier/${id}`
        const result = await axios.get(URL)
        store.dispatch(hideLoader())
        if (result.status === 200 && result.data['status'] === "Associated") {
            toast.error(result.data['data'])
            return false;
        } else if (result.status === 200 && result.data['status'] === "Success") {
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