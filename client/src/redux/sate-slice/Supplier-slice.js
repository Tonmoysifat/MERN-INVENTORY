import {createSlice} from "@reduxjs/toolkit";
export const supplierSlice = createSlice({
    name: "supplier",
    initialState: {
        List: [],
        ListTotal: 0,
        FormValue: {
            SupplierName: "",
            SupplierPhone: "",
            SupplierEmail: "",
            SupplierAddress: ""
        }
    },
    reducers: {
        setSupplierList: (state, action) => {
            state.List = action.payload
        },
        setSupplierListTotal: (state, action) => {
            state.ListTotal = action.payload
        },
        setSupplierFormValue: (state, action) => {
            state.FormValue[`${action.payload.fieldName}`] = action.payload.value
        },
        setSupplierFormValueReset: (state, action) => {
            Object.keys(state.FormValue).forEach((i) => state.FormValue[i] = "");
        }
    }
});

export const {setSupplierList, setSupplierListTotal,setSupplierFormValue,setSupplierFormValueReset} = supplierSlice.actions;
export default supplierSlice.reducer;