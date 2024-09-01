import {createSlice} from "@reduxjs/toolkit";

export const categorySlice = createSlice({
    name: "category",
    initialState: {
        List: [],
        ListTotal: 0,
    },
    reducers: {
        setCategoryList: (state, action) => {
            state.List = action.payload
        },
        setCategoryListTotal: (state, action) => {
            state.ListTotal = action.payload
        }
    }
});

export const {setCategoryList, setCategoryListTotal} = categorySlice.actions;
export default categorySlice.reducer;