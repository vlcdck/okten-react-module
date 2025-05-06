import {configureStore} from "@reduxjs/toolkit";
import {authSlice} from "./slices/authSlice.ts";

export const store = configureStore({
    reducer: {
        authStoreSlice: authSlice.reducer,
    },
})