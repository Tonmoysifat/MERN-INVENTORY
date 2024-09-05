import {createSlice} from "@reduxjs/toolkit";

export const summarySlice = createSlice({
    name: "summary",
    initialState: {
        ExpenseSummary: [],
        PurchaseSummary: [],
        SaleSummary: [],
        ReturnSummary: [],
        ExpenseTotal: 0,
        PurchaseTotal: 0,
        SaleTotal: 0,
        ReturnTotal: 0,
    },
    reducers: {
        setExpenseSummary: (state, action) => {
            state.ExpenseSummary = action.payload
        },
        setExpenseTotal: (state, action) => {
            state.ExpenseTotal = action.payload
        },
        setPurchaseSummary: (state, action) => {
            state.PurchaseSummary = action.payload
        },
        setPurchaseTotal: (state, action) => {
            state.PurchaseTotal = action.payload
        },
        setSaleSummary: (state, action) => {
            state.SaleSummary = action.payload
        },
        setSaleTotal: (state, action) => {
            state.SaleTotal = action.payload
        },
        setReturnSummary: (state, action) => {
            state.ReturnSummary = action.payload
        },
        setReturnTotal: (state, action) => {
            state.ReturnTotal = action.payload
        },
    }
})

export const {
    setExpenseSummary,
    setPurchaseSummary,
    setSaleSummary,
    setReturnSummary,
    setExpenseTotal,
    setPurchaseTotal,
    setSaleTotal,
    setReturnTotal
} = summarySlice.actions
export default summarySlice.reducer