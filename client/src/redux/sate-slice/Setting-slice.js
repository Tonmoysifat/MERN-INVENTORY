import {createSlice} from "@reduxjs/toolkit";
export const SettingsSlice = createSlice({
    name:"settings",
    initialState:{
        loader:"d-none",
    },
    reducers:{
        showLoader:(state)=>{
            state.loader = ""
        },
        hideLoader:(state)=>{
            state.loader = "d-none"
        }
    }
});

export const {showLoader,hideLoader} = SettingsSlice.actions;
export default SettingsSlice.reducer;