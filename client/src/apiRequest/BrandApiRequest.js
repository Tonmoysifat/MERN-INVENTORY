import store from "../redux/store/Store.js";
import {hideLoader, showLoader} from "../redux/sate-slice/Setting-slice.js";
import axios from "axios";
import {
    setBrandFormValue,
    setBrandFormValueReset,
    setBrandList,
    setBrandListTotal
} from "../redux/sate-slice/Brand-slice.js";
import toast from "react-hot-toast";

export const BrandListRequest = async (pageNo, perPage, SearchArray) => {
    try {
        store.dispatch(showLoader())
        let URL = `/api/BrandList/${pageNo}/${perPage}/${SearchArray}`
        let result = await axios.get(URL)
        store.dispatch(hideLoader())
        if (result.status === 200 && result.data["status"] === "Success") {
            if (result.data["data"][0]["Rows"].length > 0) {
                store.dispatch(setBrandList(result.data["data"][0]["Rows"]))
                store.dispatch(setBrandListTotal(result.data["data"][0]["Total"][0]["count"]))
            } else {
                store.dispatch(setBrandList([]))
                store.dispatch(setBrandListTotal(0))
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

export const CreateBrandRequest = async (postBody, id) => {
    try {
        store.dispatch(showLoader())
        let URL = `/api/CreateBrand`
        if (id !== null) {
            URL = `/api/UpdateBrand/${id}`
        }
        let result = await axios.post(URL, postBody)
        store.dispatch(hideLoader())
        if (result.status === 200 && result.data["status"] === "Success") {
            if (id !== null) {
                toast.success("Updated Successfully")
            } else {
                toast.success("Created Successfully")
            }
            store.dispatch(setBrandFormValueReset())
            return true
        } else if (result.status === 200 && result.data["status"] === "Matched") {
            toast.error("This Brand is Already Created. Create a new one")
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

export const BrandDetailsByIdRequest = async (id) => {
    try {
        store.dispatch(showLoader())
        let URL = `/api/BrandDetailsById/${id}`
        let result = await axios.get(URL)
        store.dispatch(hideLoader())
        if (result.status === 200 && result.data["status"] === "Success") {
            store.dispatch(setBrandFormValue({
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

export async function DeleteBrandRequest(id) {
    try {
        store.dispatch(showLoader())
        let URL = `/api/DeleteBrand/${id}`
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