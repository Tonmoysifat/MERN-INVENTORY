import store from "../redux/store/Store.js";
import {hideLoader, showLoader} from "../redux/sate-slice/Setting-slice.js";
import axios from "axios";
import {
    setBrandDropDown,
    setCategoryDropDown, setProductFormValue, setProductFormValueReset,
    setProductList,
    setProductListTotal
} from "../redux/sate-slice/Product-slice.js";
import toast from "react-hot-toast";
import {setExpenseDropDown, setExpenseFormValue, setExpenseFormValueReset} from "../redux/sate-slice/Expense-slice.js";

export const ProductListRequest = async (pageNo, perPage, SearchArray) => {
    try {
        store.dispatch(showLoader())
        let URL = `/api/ProductList/${pageNo}/${perPage}/${SearchArray}`
        let result = await axios.get(URL)
        store.dispatch(hideLoader())
        if (result.status === 200 && result.data["status"] === "Success") {
            if (result.data["data"][0]["Rows"].length > 0) {
                store.dispatch(setProductList(result.data["data"][0]["Rows"]))
                store.dispatch(setProductListTotal(result.data["data"][0]["Total"][0]["count"]))
            } else {
                store.dispatch(setProductList([]))
                store.dispatch(setProductListTotal(0))
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

export async function BrandDropDownRequest() {
    try {
        store.dispatch(showLoader())
        let URL = `/api/BrandDropDown`
        const result = await axios.get(URL)
        store.dispatch(hideLoader())
        if (result.status === 200 && result.data["status"] === "Success") {
            if (result.data['data'].length > 0) {
                store.dispatch(setBrandDropDown(result.data['data']))
            } else {
                store.dispatch(setBrandDropDown([]))
                toast.error("Product's brands not found")
            }
        } else {
            toast.error("Something Went Wrong")
        }
    } catch (e) {
        toast.error("Something Went Wrong")
        store.dispatch(hideLoader())
    }
}

export async function CategoryDropDownRequest() {
    try {
        store.dispatch(showLoader())
        let URL = `/api/CategoryDropDown`
        const result = await axios.get(URL)
        store.dispatch(hideLoader())
        if (result.status === 200 && result.data["status"] === "Success") {
            if (result.data['data'].length > 0) {
                store.dispatch(setCategoryDropDown(result.data['data']))
            } else {
                store.dispatch(setCategoryDropDown([]))
                toast.error("Product's categories not found")
            }
        } else {
            toast.error("Something Went Wrong")
        }
    } catch (e) {
        toast.error("Something Went Wrong")
        store.dispatch(hideLoader())
    }
}

export const CreateProductRequest = async (postBody, id) => {
    try {
        store.dispatch(showLoader())
        let URL = `/api/CreateProduct`
        if (id !== null) {
            URL = `/api/UpdateProduct/${id}`
        }
        let result = await axios.post(URL, postBody)
        store.dispatch(hideLoader())
        if (result.status === 200 && result.data["status"] === "Success") {
            if (id !== null) {
                toast.success("Updated Successfully")
            } else {
                toast.success("Created Successfully")
            }
            store.dispatch(setProductFormValueReset())
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

export const ProductDetailsByIdRequest = async (id) => {
    try {
        store.dispatch(showLoader())
        let URL = `/api/ProductDetailsById/${id}`
        let result = await axios.get(URL)
        store.dispatch(hideLoader())
        if (result.status === 200 && result.data["status"] === "Success") {
            store.dispatch(setProductFormValue({
                fieldName: "BrandID",
                value: result.data["data"][0]["BrandID"]
            }));

            store.dispatch(setProductFormValue({
                fieldName: "CategoryID",
                value: result.data["data"][0]["CategoryID"]
            }));

            store.dispatch(setProductFormValue({
                fieldName: "Name",
                value: result.data["data"][0]["Name"]
            }));
            store.dispatch(setProductFormValue({
                fieldName: "Unit",
                value: result.data["data"][0]["Unit"]
            }));
            store.dispatch(setProductFormValue({
                fieldName: "Details",
                value: result.data["data"][0]["Details"]
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

export async function DeleteProductRequest(id) {
    try {
        store.dispatch(showLoader())
        let URL = `/api/DeleteProduct/${id}`
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