import {createSlice} from "@reduxjs/toolkit";
export const productSlice = createSlice({
    name: "product",
    initialState: {
        List: [],
        ListTotal: 0,
    },
    reducers: {
        setProductList: (state, action) => {
            state.List = action.payload
        },
        setProductListTotal: (state, action) => {
            state.ListTotal = action.payload
        }
    }
});

export const {setProductList, setProductListTotal} = productSlice.actions;
export default productSlice.reducer;