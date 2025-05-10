import {configureStore} from "@reduxjs/toolkit";
import {authSlice} from "./slices/authSlice.ts";
import {searchSlice} from "./slices/searchSlice.ts";
import {recommendationMovieSlice} from "./slices/recommendationMovieSlice.ts";
import {movieDetailSlice} from "./slices/movieSlice.ts";
import {genreSlice} from "./slices/genreSlice.ts";
import {genreMovieSlice} from "./slices/genreMovieSlice.ts";
import {ratingSlice} from "./slices/ratingSlice.ts";

export const store = configureStore({
    reducer: {
        authStoreSlice: authSlice.reducer,
        searchStoreSlice: searchSlice.reducer,
        recommendationMovieStoreSlice: recommendationMovieSlice.reducer,
        moviesStoreSlice: movieDetailSlice.reducer,
        genreStoreSlice: genreSlice.reducer,
        genreMovieStoreSlice: genreMovieSlice.reducer,
        ratingStoreSlice: ratingSlice.reducer,
    },
})