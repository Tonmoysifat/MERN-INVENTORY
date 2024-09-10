import {createSlice} from "@reduxjs/toolkit";

export const UserSlice = createSlice({
    name: "user",
    initialState: {
        value: [],
        profilePic: ""
    },
    reducers: {
        setUser: (state, action) => {
            state.value = action.payload
        },
        setProfilePic: (state, action) => {
            state.profilePic = action.payload
        }
    }
})
export const {setUser, setProfilePic} = UserSlice.actions
export default UserSlice.reducer