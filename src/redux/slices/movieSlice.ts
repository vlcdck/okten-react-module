import {createAsyncThunk, createSlice, isFulfilled, PayloadAction} from "@reduxjs/toolkit";
import {IMovie} from "../../models/IMovie"
import {getData} from "../../services/getData.api.service.ts";

type MovieSliceType = {
    movies: IMovie[],
    movieLoadState: boolean,
}

const initialMovieState: MovieSliceType = {movies: [], movieLoadState: false};

const loadMovies = createAsyncThunk('movie/loadMovies',
    async (page: string, thunkAPI) => {
        const movies = await getData<IMovie[]>('/3/discover/movie?page=' + page);
        return thunkAPI.fulfillWithValue(movies);
    })

export const movieSlice = createSlice({
    name: 'movieSlice',
    initialState: initialMovieState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(loadMovies.fulfilled, (state, action: PayloadAction<IMovie[]>) => {
                state.movies = action.payload
            })
            .addMatcher(isFulfilled(loadMovies), state => {
                state.movieLoadState = true;
            })
})

export const movieActions = {
    ...movieSlice.actions, loadMovies
}