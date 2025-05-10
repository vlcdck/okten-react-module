import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface RatingState {
    rating: { [movieId: number]: number }
}

const initialState: RatingState = {
    rating: {},
}

export const ratingSlice = createSlice({
    name: 'ratingSlice',
    initialState: initialState,
    reducers: {
        setRating: (state, action: PayloadAction<{ movieId: number; rating: number }>) => {
            state.rating[action.payload.movieId] = action.payload.rating;
        }
    }
});

export const ratingActions = {
    ...ratingSlice.actions,
}