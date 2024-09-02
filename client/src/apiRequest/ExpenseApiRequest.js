import store from "../redux/store/Store.js";
import {hideLoader, showLoader} from "../redux/sate-slice/Setting-slice.js";
import axios from "axios";
import {
    setExpenseDropDown, setExpenseFormValue,
    setExpenseFormValueReset,
    setExpenseList,
    setExpenseListTotal
} from "../redux/sate-slice/Expense-slice.js";
import toast from "react-hot-toast";
import {setExpenseTypeFormValue, setExpenseTypeFormValueReset} from "../redux/sate-slice/ExpenseType-slice.js";

export const ExpenseListRequest = async (pageNo, perPage, SearchArray) => {
    try {
        store.dispatch(showLoader())
        let URL = `/api/ExpenseList/${pageNo}/${perPage}/${SearchArray}`
        let result = await axios.get(URL)
        store.dispatch(hideLoader())
        if (result.status === 200 && result.data["status"] === "Success") {
            if (result.data["data"][0]["Rows"].length > 0) {
                store.dispatch(setExpenseList(result.data["data"][0]["Rows"]))
                store.dispatch(setExpenseListTotal(result.data["data"][0]["Total"][0]["count"]))
            } else {
                store.dispatch(setExpenseList([]))
                store.dispatch(setExpenseListTotal(0))
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

export async function ExpenseDropDownRequest() {
    try {
        store.dispatch(showLoader())
        let URL = `/api/ExpenseTypeDropDown`
        const result = await axios.get(URL)
        store.dispatch(hideLoader())
        if (result.status === 200 && result.data["status"] === "Success") {
            if (result.data['data'].length > 0) {
                store.dispatch(setExpenseDropDown(result.data['data']))
            } else {
                store.dispatch(setExpenseDropDown([]))
                toast.error("No Expense Type Found")
            }
        } else {
            toast.error("Something Went Wrong")
        }
    } catch (e) {
        toast.error("Something Went Wrong")
        store.dispatch(hideLoader())
    }
}

export const CreateExpenseRequest = async (postBody, id) => {
    try {
        store.dispatch(showLoader())
        let URL = `/api/CreateExpense`
        if (id !== null) {
            URL = `/api/UpdateExpense/${id}`
        }
        let result = await axios.post(URL, postBody)
        store.dispatch(hideLoader())
        if (result.status === 200 && result.data["status"] === "Success") {
            if (id !== null) {
                toast.success("Updated Successfully")
            } else {
                toast.success("Created Successfully")
            }
            store.dispatch(setExpenseFormValueReset())
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

export const ExpenseDetailsByIdRequest = async (id) => {
    try {
        store.dispatch(showLoader())
        let URL = `/api/ExpenseDetailsById/${id}`
        let result = await axios.get(URL)
        store.dispatch(hideLoader())
        if (result.status === 200 && result.data["status"] === "Success") {
            store.dispatch(setExpenseFormValue({
                fieldName: "TypeID",
                value: result.data["data"][0]["TypeID"]
            }));

            store.dispatch(setExpenseFormValue({
                fieldName: "Amount",
                value: result.data["data"][0]["Amount"]
            }));

            store.dispatch(setExpenseFormValue({
                fieldName: "Note",
                value: result.data["data"][0]["Note"]
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

export async function DeleteExpenseRequest(id) {
    try {
        store.dispatch(showLoader())
        let URL = `/api/DeleteExpense/${id}`
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