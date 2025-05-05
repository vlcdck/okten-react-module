import {configureStore} from "@reduxjs/toolkit";
import {movieSlice} from "./slices/movieSlice.ts";
import authSlice from "./slices/authSlice.ts";

export const store = configureStore({
    reducer: {
        movieStoreSlice: movieSlice.reducer,
        auth: authSlice.reducer,
    },
})