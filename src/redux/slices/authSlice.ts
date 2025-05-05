import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getAccountDetails} from '../../services/getAccountDetails';
import {createSession} from "../../services/createSession.ts";

const savedSessionId = localStorage.getItem('session_id');

interface AuthState {
    sessionId: string | null;
    user: any;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    sessionId: savedSessionId,
    user: null,
    loading: false,
    error: null,
};

export const fetchSessionAndUser = createAsyncThunk(
    'auth/fetchSessionAndUser',
    async (requestToken: string, thunkAPI) => {
        try {
            const sessionId = await createSession(requestToken);
            const user = await getAccountDetails(sessionId);
            return {sessionId, user};
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.sessionId = null;
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSessionAndUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSessionAndUser.fulfilled, (state, action) => {
                state.loading = false;
                state.sessionId = action.payload.sessionId;
                state.user = action.payload.user;
            })
            .addCase(fetchSessionAndUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const {logout} = authSlice.actions;
export default authSlice;
