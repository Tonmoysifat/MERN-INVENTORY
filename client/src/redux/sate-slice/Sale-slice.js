import {createSlice} from "@reduxjs/toolkit";

export const saleSlice = createSlice({
    name: "sale",
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
        SaleItemList: [],
    },
    reducers: {
        setSaleList: (state, action) => {
            state.List = action.payload
        },
        setSaleListTotal: (state, action) => {
            state.ListTotal = action.payload
        },
        setCustomerDropDown: (state, action) => {
            state.CustomerDropDown = action.payload
        },
        setProductDropDown: (state, action) => {
            state.ProductDropDown = action.payload
        },
        setSaleFormValue: (state, action) => {
            state.FormValue[`${action.payload.fieldName}`] = action.payload.value
        },
        setSaleFormValueReset: (state, action) => {
            Object.keys(state.FormValue).forEach((i) => state.FormValue[i] = "");
            state.SaleItemList = []
        },
        setSaleItemList: (state, action) => {
            state.SaleItemList.push(action.payload)
        },
        RemoveSaleItem: (state, action) => {
            state.SaleItemList.splice(action.payload, 1)
        }

    }
});
export const {
    setSaleList,
    setSaleListTotal,
    setCustomerDropDown,
    setProductDropDown,
    setSaleFormValue,
    setSaleFormValueReset,
    setSaleItemList,
    RemoveSaleItem
} = saleSlice.actions;
export default saleSlice.reducer;