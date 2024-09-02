import {createSlice} from "@reduxjs/toolkit";

export const expenseSlice = createSlice({
    name: "expense",
    initialState: {
        List: [],
        ListTotal: 0,
        DropDown: [],
        FormValue: {
            TypeID: "",
            Amount: "",
            Note: ""
        }
    },
    reducers: {
        setExpenseList: (state, action) => {
            state.List = action.payload
        },
        setExpenseListTotal: (state, action) => {
            state.ListTotal = action.payload
        },
        setExpenseDropDown: (state, action) => {
            state.DropDown = action.payload
        },
        setExpenseFormValue: (state, action) => {
            state.FormValue[`${action.payload.fieldName}`] = action.payload.value
        },
        setExpenseFormValueReset: (state, action) => {
            Object.keys(state.FormValue).forEach((i) => state.FormValue[i] = "");
        }
    }
});

export const {
    setExpenseList,
    setExpenseListTotal,
    setExpenseDropDown,
    setExpenseFormValue,
    setExpenseFormValueReset
} = expenseSlice.actions;
export default expenseSlice.reducer;