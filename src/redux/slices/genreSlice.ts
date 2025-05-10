import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getGenres} from "../../services/getMovies.api.service";
import {IGenre} from "../../models/IGenres.ts";

interface GenreState {
    genres: IGenre[];
    isLoading: boolean;
    error: string | null;
}

const initialState: GenreState = {
    genres: [],
    isLoading: false,
    error: null,
}

// load just genres
export const fetchGenres = createAsyncThunk(
    'genreSlice/fetchGenres',
    async (_, thunkAPI) => {
        try {
            return await getGenres();
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
);

export const genreSlice = createSlice({
    name: 'genreSlice',
    initialState: initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(fetchGenres.pending, state => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchGenres.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.genres = action.payload;
            })
            .addCase(fetchGenres.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error as string;
            })
})

export const genreSliceActions = {
    ...genreSlice.actions,
    fetchGenres
}