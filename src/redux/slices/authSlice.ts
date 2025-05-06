import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {createSession, getAccountDetails} from "../../services/tmdb.api.service.ts";
import {IUser} from "../../models/IUser.ts";
import axios from "axios";

const savedSessionId = localStorage.getItem('session_id');


interface AuthState {
    sessionId: string | null;
    user: IUser | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    sessionId: savedSessionId,
    user: null,
    loading: false,
    error: null
}

const fetchSessionAndUser =
    createAsyncThunk('authSlice/fetchSessionAndUser',
        async (requestToken: string, thunkAPI) => {
            try {
                const sessionId = await createSession(requestToken);
                localStorage.setItem('session_id', sessionId);
                const user = await getAccountDetails(sessionId)
                console.log(user)
                return thunkAPI.fulfillWithValue({sessionId, user});
            } catch (error: unknown) {
                if (axios.isAxiosError(error)) {
                    return thunkAPI.rejectWithValue(error.response?.data.status_message || 'Axios error');
                }
                return thunkAPI.rejectWithValue('Unknown error');
            }
        }
    )

export const authSlice = createSlice({
    name: "authSlice",
    initialState: initialState,
    reducers: {
        logout: (state) => {
            state.sessionId = null;
            state.user = null;
            localStorage.removeItem('session_id');

        },
    },
    extraReducers: builder =>
        builder
            .addCase(fetchSessionAndUser.fulfilled, (state, action) => {
                state.loading = false;
                state.sessionId = action.payload.sessionId;
                state.user = action.payload.user;
            })
            .addCase(fetchSessionAndUser.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSessionAndUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string
            })
})

export const authActions = {
    ...authSlice.actions,
    fetchSessionAndUser
};