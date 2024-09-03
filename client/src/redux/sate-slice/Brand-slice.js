import {createSlice} from "@reduxjs/toolkit";

export const brandSlice = createSlice({
    name: "brand",
    initialState: {
        List: [],
        ListTotal: 0,
        FormValue: {
            Name:""
        }
    },
    reducers: {
        setBrandList: (state, action) => {
            state.List = action.payload
        },
        setBrandListTotal: (state, action) => {
            state.ListTotal = action.payload
        },
        setBrandFormValue: (state, action) => {
            state.FormValue[`${action.payload.fieldName}`] = action.payload.value
        },
        setBrandFormValueReset: (state, action) => {
            Object.keys(state.FormValue).forEach((i) => state.FormValue[i] = "");
        }
    }
});

export const {setBrandList, setBrandListTotal,setBrandFormValue,setBrandFormValueReset} = brandSlice.actions;
export default brandSlice.reducer;