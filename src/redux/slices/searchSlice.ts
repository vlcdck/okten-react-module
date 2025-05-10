import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IMovie} from "../../models/IMovie.ts";
import {getSearchedMovies} from "../../services/getMovies.api.service.ts";

interface SearchState {
    query: string;
    results: IMovie[];
    isLoading: boolean;
    error: string | null;
    page: number;
    totalPages: number;
}

interface ISearchParams {
    query: string;
    page: number;
}

const initialState: SearchState = {
    query: '',
    results: [],
    isLoading: false,
    error: null,
    page: 1,
    totalPages: 1,
}

// load movies by search query
export const fetchSearchMovies = createAsyncThunk(
    'searchSlice/fetchSearchMovies',
    async ({query, page}: ISearchParams, thunkAPI) => {
        try {
            const response = await getSearchedMovies(query, page);
            return {
                results: response.results,
                page: response.page,
                totalPages: response.total_pages,
            };
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
)

export const searchSlice = createSlice({
    name: 'searchSlice',
    initialState: initialState,
    reducers: {
        clearSearch: (state) => {
            state.query = '';
            state.results = [];
        },
        setQuery: (state, action) => {
            state.query = action.payload;
        }
    },
    extraReducers: builder =>
        builder
            .addCase(fetchSearchMovies.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchSearchMovies.fulfilled, (state, action) => {
                state.results = action.payload.results;
                state.page = action.payload.page;
                state.totalPages = action.payload.totalPages;
                state.isLoading = false;
            })
            .addCase(fetchSearchMovies.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
});

export const searchActions = {
    ...searchSlice.actions,
    fetchSearchMovies
}