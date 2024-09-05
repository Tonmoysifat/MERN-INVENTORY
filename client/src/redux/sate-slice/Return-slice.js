import {createSlice} from "@reduxjs/toolkit";

export const returnSlice = createSlice({
    name: "return",
    initialState: {
        List: [],
        ListTotal: 0,
        CustomerDropDown: [],
        ProductDropDown: [],
        FormValue: {
            CustomerID: "",
            VatTax: "",
            Discount: "",
            OtherCost: "",
            ShippingCost: "",
            GrandTotal: "",
            Note: "",
        },
        ReturnItemList: [],
    },
    reducers: {
        setReturnList: (state, action) => {
            state.List = action.payload
        },
        setReturnListTotal: (state, action) => {
            state.ListTotal = action.payload
        },
        setCustomerDropDown: (state, action) => {
            state.CustomerDropDown = action.payload
        },
        setProductDropDown: (state, action) => {
            state.ProductDropDown = action.payload
        },
        setReturnFormValue: (state, action) => {
            state.FormValue[`${action.payload.fieldName}`] = action.payload.value
        },
        setReturnFormValueReset: (state, action) => {
            Object.keys(state.FormValue).forEach((i) => state.FormValue[i] = "");
            state.ReturnItemList = []
        },
        setReturnItemList: (state, action) => {
            state.ReturnItemList.push(action.payload)
        },
        RemoveReturnItem: (state, action) => {
            state.ReturnItemList.splice(action.payload, 1)
        }
    }
});

export const {
    setReturnList,
    setReturnListTotal,
    setCustomerDropDown,
    setProductDropDown,
    setReturnFormValue,
    setReturnFormValueReset,
    setReturnItemList,
    RemoveReturnItem
} = returnSlice.actions;
export default returnSlice.reducer;