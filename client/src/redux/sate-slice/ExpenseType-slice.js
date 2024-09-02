import {createSlice} from "@reduxjs/toolkit";
export const expenseTypeSlice = createSlice({
    name: "expenseType",
    initialState: {
        List: [],
        ListTotal: 0,
        FormValue: {
            Name:""
        }
    },
    reducers: {
        setExpenseTypeList: (state, action) => {
            state.List = action.payload
        },
        setExpenseTypeListTotal: (state, action) => {
            state.ListTotal = action.payload
        },
        setExpenseTypeFormValue: (state, action) => {
            state.FormValue[`${action.payload.fieldName}`] = action.payload.value
        },
        setExpenseTypeFormValueReset: (state, action) => {
            Object.keys(state.FormValue).forEach((i) => state.FormValue[i] = "");
        }
    }
});

export const {setExpenseTypeList, setExpenseTypeListTotal,setExpenseTypeFormValue,setExpenseTypeFormValueReset} = expenseTypeSlice.actions;
export default expenseTypeSlice.reducer;