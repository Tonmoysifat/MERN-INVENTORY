import store from "../redux/store/Store.js";
import {hideLoader, showLoader} from "../redux/sate-slice/Setting-slice.js";
import axios from "axios";
import {setBrandList, setBrandListTotal} from "../redux/sate-slice/Brand-slice.js";
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