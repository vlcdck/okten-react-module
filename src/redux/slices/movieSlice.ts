import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IMovie} from "../../models/IMovie.ts";
import {getDetailMovie} from "../../services/getMovies.api.service.ts";

interface MovieDetailState {
    movie: IMovie | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: MovieDetailState = {
    movie: null,
    isLoading: false,
    error: null,
}

// load movie detail by id
export const fetchDetailMovie = createAsyncThunk(
    'movieDetailSlice/fetchDetailMovie',
    async (id: string, thunkAPI) => {
        try {
            return getDetailMovie(id);
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)

export const movieDetailSlice = createSlice({
    name: 'movieDetailSlice',
    initialState: initialState,
    reducers: {
        clearMovie: (state) => {
            state.movie = null;
        }
    },
    extraReducers: builder =>
        builder
            .addCase(fetchDetailMovie.pending, state => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchDetailMovie.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.movie = action.payload;
            })
            .addCase(fetchDetailMovie.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
})

export const movieDetailActions = {
    ...movieDetailSlice.actions,
    fetchDetailMovie
}