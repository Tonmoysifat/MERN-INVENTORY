import {createSlice} from "@reduxjs/toolkit";
export const returnSlice = createSlice({
    name: "return",
    initialState: {
        List: [],
        ListTotal: 0,
    },
    reducers: {
        setReturnList: (state, action) => {
            state.List = action.payload
        },
        setReturnListTotal: (state, action) => {
            state.ListTotal = action.payload
        }
    }
});

export const {setReturnList, setReturnListTotal} = returnSlice.actions;
export default returnSlice.reducer;