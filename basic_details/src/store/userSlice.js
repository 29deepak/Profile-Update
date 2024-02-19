import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "auth",
    initialState: {
        username: '',
        active: false
    },
    reducers: {
        setUsername: (state, action) => {
            state.username = action.payload.username
        }
    }
})
export const userAction = userSlice.actions;
export default userSlice;