import {createSlice} from "@reduxjs/toolkit";
export const supplierSlice = createSlice({
    name: "supplier",
    initialState: {
        List: [],
        ListTotal: 0,
    },
    reducers: {
        setSupplierList: (state, action) => {
            state.List = action.payload
        },
        setSupplierListTotal: (state, action) => {
            state.ListTotal = action.payload
        }
    }
});

export const {setSupplierList, setSupplierListTotal} = supplierSlice.actions;
export default supplierSlice.reducer;