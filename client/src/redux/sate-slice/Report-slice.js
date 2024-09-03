import {createSlice} from "@reduxjs/toolkit";

export const reportSlice = createSlice({
    name: "report",
    initialState: {
        ExpensesByDateList: [],
        PurchaseByDateList: [],
        SalesByDateList: [],
        ReturnByDateList: []
    },
    reducers: {
        setExpensesByDateList: (state, action) => {
            state.ExpensesByDateList = action.payload
        },
        setPurchaseByDateList: (state, action) => {
            state.PurchaseByDateList = action.payload
        },
        setSalesByDateList: (state, action) => {
            state.SalesByDateList = action.payload
        },
        setReturnByDateList: (state, action) => {
            state.ReturnByDateList = action.payload
        }
    }
})
export const {
    setExpensesByDateList,
    setPurchaseByDateList,
    setSalesByDateList,
    setReturnByDateList
} = reportSlice.actions
export default reportSlice.reducer