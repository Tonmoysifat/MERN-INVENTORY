import {createSlice} from "@reduxjs/toolkit";
export const expenseSlice = createSlice({
    name: "expense",
    initialState: {
        List: [],
        ListTotal: 0,
    },
    reducers: {
        setExpenseList: (state, action) => {
            state.List = action.payload
        },
        setExpenseListTotal: (state, action) => {
            state.ListTotal = action.payload
        }
    }
});

export const {setExpenseList, setExpenseListTotal} = expenseSlice.actions;
export default expenseSlice.reducer;