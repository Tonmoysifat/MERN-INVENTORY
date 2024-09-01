import {createSlice} from "@reduxjs/toolkit";
export const expenseTypeSlice = createSlice({
    name: "expenseType",
    initialState: {
        List: [],
        ListTotal: 0,
    },
    reducers: {
        setExpenseTypeList: (state, action) => {
            state.List = action.payload
        },
        setExpenseTypeListTotal: (state, action) => {
            state.ListTotal = action.payload
        }
    }
});

export const {setExpenseTypeList, setExpenseTypeListTotal} = expenseTypeSlice.actions;
export default expenseTypeSlice.reducer;