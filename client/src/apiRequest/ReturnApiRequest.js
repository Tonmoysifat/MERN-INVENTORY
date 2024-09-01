import store from "../redux/store/Store.js";
import {hideLoader, showLoader} from "../redux/sate-slice/Setting-slice.js";
import axios from "axios";
import {setReturnList, setReturnListTotal} from "../redux/sate-slice/Return-slice.js";
import toast from "react-hot-toast";

export const ReturnListRequest = async (pageNo, perPage, SearchArray) => {
    try {
        store.dispatch(showLoader())
        let URL = `/api/ReturnList/${pageNo}/${perPage}/${SearchArray}`
        let result = await axios.get(URL)
        store.dispatch(hideLoader())
        if (result.status === 200 && result.data["status"] === "Success") {
            if (result.data["data"][0]["Rows"].length > 0) {
                store.dispatch(setReturnList(result.data["data"][0]["Rows"]))
                store.dispatch(setReturnListTotal(result.data["data"][0]["Total"][0]["count"]))
            } else {
                store.dispatch(setReturnList([]))
                store.dispatch(setReturnListTotal(0))
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