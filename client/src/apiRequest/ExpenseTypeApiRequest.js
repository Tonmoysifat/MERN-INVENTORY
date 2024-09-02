import store from "../redux/store/Store.js";
import {hideLoader, showLoader} from "../redux/sate-slice/Setting-slice.js";
import axios from "axios";
import {
    setExpenseTypeFormValue,
    setExpenseTypeFormValueReset,
    setExpenseTypeList,
    setExpenseTypeListTotal
} from "../redux/sate-slice/ExpenseType-slice.js";
import toast from "react-hot-toast";

export const ExpenseTypeListRequest = async (pageNo, perPage, SearchArray) => {
    try {
        store.dispatch(showLoader())
        let URL = `/api/ExpenseTypeList/${pageNo}/${perPage}/${SearchArray}`
        let result = await axios.get(URL)
        store.dispatch(hideLoader())
        if (result.status === 200 && result.data["status"] === "Success") {
            if (result.data["data"][0]["Rows"].length > 0) {
                store.dispatch(setExpenseTypeList(result.data["data"][0]["Rows"]))
                store.dispatch(setExpenseTypeListTotal(result.data["data"][0]["Total"][0]["count"]))
            } else {
                store.dispatch(setExpenseTypeList([]))
                store.dispatch(setExpenseTypeListTotal(0))
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

export const CreateExpenseTypeRequest = async (postBody, id) => {
    try {
        store.dispatch(showLoader())
        let URL = `/api/CreateExpenseType`
        if (id !== null) {
            URL = `/api/UpdateExpenseType/${id}`
        }
        let result = await axios.post(URL, postBody)
        store.dispatch(hideLoader())
        if (result.status === 200 && result.data["status"] === "Success") {
            if (id !== null) {
                toast.success("Updated Successfully")
            } else {
                toast.success("Created Successfully")
            }
            store.dispatch(setExpenseTypeFormValueReset())
            return true
        } else if (result.status === 200 && result.data["status"] === "Fail") {
            if (result.data["data"]["keyPattern"]["Name"] === 1) {
                toast.error("This Expense Type is Already Created. Try a new one")
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

export const ExpenseTypeDetailsByIdRequest = async (id) => {
    try {
        store.dispatch(showLoader())
        let URL = `/api/ExpenseTypeDetailsById/${id}`
        let result = await axios.get(URL)
        store.dispatch(hideLoader())
        if (result.status === 200 && result.data["status"] === "Success") {
            store.dispatch(setExpenseTypeFormValue({
                fieldName: "Name",
                value: result.data["data"][0]["Name"]
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

export async function DeleteExpenseTypeRequest(id) {
    try {
        store.dispatch(showLoader())
        let URL = `/api/DeleteExpenseType/${id}`
        const result = await axios.get(URL)
        store.dispatch(hideLoader())
        if (result.status === 200 && result.data['status'] === "Associated") {
            toast.error(result.data['data'])
            return false;
        }
        else if (result.status === 200 && result.data['status'] === "Success") {
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