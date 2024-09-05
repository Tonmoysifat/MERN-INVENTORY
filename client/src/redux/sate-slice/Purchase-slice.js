import {createSlice} from "@reduxjs/toolkit";
export const purchaseSlice = createSlice({
    name: "purchase",
    initialState: {
        List: [],
        ListTotal: 0,
        SupplierDropDown: [],
        ProductDropDown: [],
        FormValue: {
            SupplierID: "",
            VatTax: "",
            Discount: "",
            OtherCost: "",
            ShippingCost: "",
            GrandTotal: "",
            Note: "",
        },
        PurchaseItemList: [],
    },
    reducers: {
        setPurchaseList: (state, action) => {
            state.List = action.payload
        },
        setPurchaseListTotal: (state, action) => {
            state.ListTotal = action.payload
        },
        setSupplierDropDown: (state, action) => {
            state.SupplierDropDown = action.payload
        },
        setProductDropDown: (state, action) => {
            state.ProductDropDown = action.payload
        },
        setPurchaseFormValue: (state, action) => {
            state.FormValue[`${action.payload.fieldName}`] = action.payload.value
        },
        setPurchaseFormValueReset: (state, action) => {
            Object.keys(state.FormValue).forEach((i) => state.FormValue[i] = "");
            state.PurchaseItemList = []
        },
        setPurchaseItemList: (state, action) => {
            state.PurchaseItemList.push(action.payload)
        },
        RemovePurchaseItem: (state, action) => {
            state.PurchaseItemList.splice(action.payload, 1)
        }
    }
});

export const {setPurchaseList, setPurchaseListTotal,setSupplierDropDown,setProductDropDown,setPurchaseFormValue,setPurchaseFormValueReset,setPurchaseItemList,RemovePurchaseItem} = purchaseSlice.actions;
export default purchaseSlice.reducer;