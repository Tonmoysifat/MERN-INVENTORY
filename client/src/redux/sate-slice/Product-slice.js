import {createSlice} from "@reduxjs/toolkit";

export const productSlice = createSlice({
    name: "product",
    initialState: {
        List: [],
        ListTotal: 0,
        BrandDropDown: [],
        CategoryDropDown: [],
        FormValue: {
            BrandID: "",
            CategoryID: "",
            Name: "",
            Unit: "",
            Details: "",
        }
    },
    reducers: {
        setProductList: (state, action) => {
            state.List = action.payload
        },
        setProductListTotal: (state, action) => {
            state.ListTotal = action.payload
        },
        setBrandDropDown: (state, action) => {
            state.BrandDropDown = action.payload
        },
        setCategoryDropDown: (state, action) => {
            state.CategoryDropDown = action.payload
        },
        setProductFormValue: (state, action) => {
            state.FormValue[`${action.payload.fieldName}`] = action.payload.value
        },
        setProductFormValueReset: (state, action) => {
            Object.keys(state.FormValue).forEach((i) => state.FormValue[i] = "");
        }
    }
});

export const {
    setProductList,
    setProductListTotal,
    setBrandDropDown,
    setCategoryDropDown,
    setProductFormValue,
    setProductFormValueReset
} = productSlice.actions;
export default productSlice.reducer;