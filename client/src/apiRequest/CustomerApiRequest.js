import store from "../redux/store/Store.js";
import {hideLoader, showLoader} from "../redux/sate-slice/Setting-slice.js";
import axios from "axios";
import {
    setCustomerFormValue,
    setCustomerList,
    setCustomerListTotal,
    setFormValueReset
} from "../redux/sate-slice/Customer-slice.js";
import toast from "react-hot-toast";

export const CustomerListRequest = async (pageNo, perPage, SearchArray) => {
    try {
        store.dispatch(showLoader())
        let URL = `/api/CustomerList/${pageNo}/${perPage}/${SearchArray}`
        let result = await axios.get(URL)
        store.dispatch(hideLoader())
        if (result.status === 200 && result.data["status"] === "Success") {
            if (result.data["data"][0]["Rows"].length > 0) {
                store.dispatch(setCustomerList(result.data["data"][0]["Rows"]))
                store.dispatch(setCustomerListTotal(result.data["data"][0]["Total"][0]["count"]))
            } else {
                store.dispatch(setCustomerList([]))
                store.dispatch(setCustomerListTotal(0))
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
export const CreateCustomerRequest = async (postBody) => {
    try {
        store.dispatch(showLoader())
        let URL = `/api/CreateCustomer`
        let result = await axios.post(URL, postBody)
        store.dispatch(hideLoader())
        if (result.status === 200 && result.data["status"] === "Success") {
            toast.success("Created Successfully")
            store.dispatch(setFormValueReset())
            return true
        } else if (result.status === 200 && result.data["status"] === "Fail") {
            if (result.data["data"]["keyPattern"]["CustomerPhone"] === 1) {
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