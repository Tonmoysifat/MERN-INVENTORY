import store from "../redux/store/Store.js";
import {hideLoader, showLoader} from "../redux/sate-slice/Setting-slice.js";
import axios from "axios";
import {
    setCategoryFormValue,
    setCategoryFormValueReset,
    setCategoryList,
    setCategoryListTotal
} from "../redux/sate-slice/Category-slice.js";
import toast from "react-hot-toast";
import {setBrandFormValue, setBrandFormValueReset} from "../redux/sate-slice/Brand-slice.js";

export const CategoryListRequest = async (pageNo, perPage, SearchArray) => {
    try {
        store.dispatch(showLoader())
        let URL = `/api/CategoryList/${pageNo}/${perPage}/${SearchArray}`
        let result = await axios.get(URL)
        store.dispatch(hideLoader())
        if (result.status === 200 && result.data["status"] === "Success") {
            if (result.data["data"][0]["Rows"].length > 0) {
                store.dispatch(setCategoryList(result.data["data"][0]["Rows"]))
                store.dispatch(setCategoryListTotal(result.data["data"][0]["Total"][0]["count"]))
            } else {
                store.dispatch(setCategoryList([]))
                store.dispatch(setCategoryListTotal(0))
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

export const CreateCategoryRequest = async (postBody, id) => {
    try {
        store.dispatch(showLoader())
        let URL = `/api/CreateCategory`
        if (id !== null) {
            URL = `/api/UpdateCategory/${id}`
        }
        let result = await axios.post(URL, postBody)
        store.dispatch(hideLoader())
        if (result.status === 200 && result.data["status"] === "Success") {
            if (id !== null) {
                toast.success("Updated Successfully")
            } else {
                toast.success("Created Successfully")
            }
            store.dispatch(setCategoryFormValueReset())
            return true
        } else if (result.status === 200 && result.data["status"] === "Matched") {
            toast.error("This Category is Already Created. Create a new one")
            return false
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

export const CategoryDetailsByIdRequest = async (id) => {
    try {
        store.dispatch(showLoader())
        let URL = `/api/CategoryDetailsById/${id}`
        let result = await axios.get(URL)
        store.dispatch(hideLoader())
        if (result.status === 200 && result.data["status"] === "Success") {
            store.dispatch(setCategoryFormValue({
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

export async function DeleteCategoryRequest(id) {
    try {
        store.dispatch(showLoader())
        let URL = `/api/DeleteCategory/${id}`
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