import {createSlice} from "@reduxjs/toolkit";

export const categorySlice = createSlice({
    name: "category",
    initialState: {
        List: [],
        ListTotal: 0,
        FormValue: {
            Name: ""
        }
    },
    reducers: {
        setCategoryList: (state, action) => {
            state.List = action.payload
        },
        setCategoryListTotal: (state, action) => {
            state.ListTotal = action.payload
        },
        setCategoryFormValue: (state, action) => {
            state.FormValue[`${action.payload.fieldName}`] = action.payload.value
        },
        setCategoryFormValueReset: (state, action) => {
            Object.keys(state.FormValue).forEach((i) => state.FormValue[i] = "");
        }
    }
});

export const {
    setCategoryList,
    setCategoryListTotal,
    setCategoryFormValue,
    setCategoryFormValueReset
} = categorySlice.actions;
export default categorySlice.reducer;