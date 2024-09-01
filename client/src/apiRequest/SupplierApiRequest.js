import store from "../redux/store/Store.js";
import {hideLoader, showLoader} from "../redux/sate-slice/Setting-slice.js";
import axios from "axios";
import {setSupplierList, setSupplierListTotal} from "../redux/sate-slice/Supplier-slice.js";
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