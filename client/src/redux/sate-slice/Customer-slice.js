import {createSlice} from "@reduxjs/toolkit";

export const customerSlice = createSlice({
    name: "customer",
    initialState: {
        List: [],
        ListTotal: 0,
        FormValue: {
            CustomerName: "",
            CustomerPhone: "",
            CustomerEmail: "",
            CustomerAddress: ""
        }
    },
    reducers: {
        setCustomerList: (state, action) => {
            state.List = action.payload
        },
        setCustomerListTotal: (state, action) => {
            state.ListTotal = action.payload
        },
        setCustomerFormValue: (state, action) => {
            state.FormValue[`${action.payload.fieldName}`] = action.payload.value
        },
        setFormValueReset: (state, action) => {
            Object.keys(state.FormValue).forEach((i) => state.FormValue[i] = "");
        }
    }
});

export const {setCustomerList, setCustomerListTotal, setCustomerFormValue, setFormValueReset} = customerSlice.actions;
export default customerSlice.reducer;