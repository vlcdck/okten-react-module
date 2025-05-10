import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IMovie} from "../../models/IMovie.ts";
import {getMovieByGenre} from "../../services/getMovies.api.service.ts";

export interface IGenreMovieState {
    genreId: number | null;
    movies: IMovie[];
    page: number;
    totalPages: number;
    isLoading: boolean;
    error: string | null;
}

const initialState: IGenreMovieState = {
    genreId: null,
    movies: [],
    page: 1,
    totalPages: 1,
    isLoading: false,
    error: null,
}
// load movies by genre
export const fetchGenreMovies = createAsyncThunk(
    'genreMovieSlice/fetchGenreMovies',
    async ({genreId, page}: { genreId: number, page: number }, thunkAPI) => {
        try {
            return thunkAPI.fulfillWithValue(await getMovieByGenre(genreId, page));
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
)

export const genreMovieSlice = createSlice({
    name: 'genreMovieSlice',
    initialState: initialState,
    reducers: {
        resetGenreMovies: state => {
            state.genreId = null;
            state.movies = [];
            state.page = 1;
            state.totalPages = 0;
            state.isLoading = false;
        },
        setGenreId: (state, action) => {
            state.genreId = action.payload;
            state.page = 1;
        }
    },
    extraReducers: builder =>
        builder
            .addCase(fetchGenreMovies.pending, state => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchGenreMovies.fulfilled, (state, action) => {
                state.isLoading = false;
                state.movies = action.payload.results;
                state.page = action.payload.page;
                state.totalPages = action.payload.total_pages;
            })
            .addCase(fetchGenreMovies.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
})

export const genreMovieActions = {
    ...genreMovieSlice.actions,
    fetchGenreMovies
}