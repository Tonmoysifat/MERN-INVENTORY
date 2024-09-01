import {createSlice} from "@reduxjs/toolkit";

export const brandSlice = createSlice({
    name: "brand",
    initialState: {
        List: [],
        ListTotal: 0,
    },
    reducers: {
        setBrandList: (state, action) => {
            state.List = action.payload
        },
        setBrandListTotal: (state, action) => {
            state.ListTotal = action.payload
        }
    }
});

export const {setBrandList, setBrandListTotal} = brandSlice.actions;
export default brandSlice.reducer;