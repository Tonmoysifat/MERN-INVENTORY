import {createSlice} from "@reduxjs/toolkit";
export const saleSlice = createSlice({
    name: "sale",
    initialState: {
        List: [],
        ListTotal: 0,
    },
    reducers: {
        setSaleList: (state, action) => {
            state.List = action.payload
        },
        setSaleListTotal: (state, action) => {
            state.ListTotal = action.payload
        }
    }
});

export const {setSaleList, setSaleListTotal} = saleSlice.actions;
export default saleSlice.reducer;