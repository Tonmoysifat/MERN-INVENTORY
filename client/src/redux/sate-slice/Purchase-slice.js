import {createSlice} from "@reduxjs/toolkit";
export const purchaseSlice = createSlice({
    name: "purchase",
    initialState: {
        List: [],
        ListTotal: 0,
    },
    reducers: {
        setPurchaseList: (state, action) => {
            state.List = action.payload
        },
        setPurchaseListTotal: (state, action) => {
            state.ListTotal = action.payload
        }
    }
});

export const {setPurchaseList, setPurchaseListTotal} = purchaseSlice.actions;
export default purchaseSlice.reducer;