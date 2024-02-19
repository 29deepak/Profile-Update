import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";

const userStore = configureStore({
    reducer: {
        auth: userSlice.reducer
    }
})
export default userStore
