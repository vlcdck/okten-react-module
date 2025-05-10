import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IMovie} from "../../models/IMovie";
import {getPopularMovies} from "../../services/getMovies.api.service.ts";

interface RecommendationMovieState {
    movies: IMovie[];
    isLoading: boolean;
    error: string | null;
    page: number;
    totalPages: number;
}

const initialState: RecommendationMovieState = {
    movies: [],
    isLoading: false,
    error: null,
    page: 1,
    totalPages: 1,
}

// load recommended movies
export const fetchRecommendationMovies = createAsyncThunk(
    'recommendationMovieSlice/fetchRecommendationMovies',
    async (page: number, thunkAPI) => {
        try {
            const response = await getPopularMovies(page);
            return {
                movies: response.results,
                page: response.page,
                totalPages: response.total_pages,
            };
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)

export const recommendationMovieSlice = createSlice({
    name: 'recommendationMovieSlice',
    initialState: initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(fetchRecommendationMovies.pending, state => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchRecommendationMovies.fulfilled, (state, action) => {
                state.movies = action.payload.movies;
                state.page = action.payload.page;
                state.totalPages = action.payload.totalPages;
                state.isLoading = false;
            })
            .addCase(fetchRecommendationMovies.rejected, (state, action) => {
                state.error = action.payload as string;
                state.isLoading = false;
            })
})

export const recommendationMovieActions = {
    ...recommendationMovieSlice.actions,
    fetchRecommendationMovies
}