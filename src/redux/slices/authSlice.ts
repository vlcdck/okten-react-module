import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IUser} from "../../models/IUser.ts";
import axios from "axios";
import {createGuestSession, createSession, getAccountDetails} from "../../services/authorization.api.ts";

const savedSessionId = localStorage.getItem('session_id');


interface AuthState {
    sessionId: string | null;
    user: IUser | null;
    isGuest: boolean;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    sessionId: savedSessionId,
    user: null,
    isGuest: false,
    loading: false,
    error: null
}


// Authorization of the user by requestToken and obtaining his data
const fetchSessionAndUser =
    createAsyncThunk('authSlice/fetchSessionAndUser',
        async (requestToken: string, thunkAPI) => {
            try {
                const sessionId = await createSession(requestToken);
                localStorage.setItem('session_id', sessionId);
                const user = await getAccountDetails(sessionId)
                return thunkAPI.fulfillWithValue({sessionId, user});
            } catch (error: unknown) {
                if (axios.isAxiosError(error)) {
                    return thunkAPI.rejectWithValue(error.response?.data.status_message || 'Axios error');
                }
                return thunkAPI.rejectWithValue('Unknown error');
            }
        }
    )

// restores a user session or creates a guest session
export const rehydrateSession = createAsyncThunk(
    'auth/rehydrateSession',
    async (_, thunkAPI) => {
        const sessionId = localStorage.getItem('session_id');
        const guestSessionId = sessionStorage.getItem('guest_session_id');

        try {
            if (sessionId) {
                const user = await getAccountDetails(sessionId);
                console.log(user)
                return {sessionId, user, isGuest: false};
            } else if (guestSessionId) {
                return {sessionId: guestSessionId, user: null, isGuest: true};
            } else {
                const newGuestSession = await createGuestSession();
                sessionStorage.setItem('guest_session_id', newGuestSession);
                return {sessionId: newGuestSession, user: null, isGuest: true};
            }
        } catch (e) {
            return thunkAPI.rejectWithValue(`Failed to restore session ${e}`);
        }
    }
);

export const authSlice = createSlice({
    name: "authSlice",
    initialState: initialState,
    reducers: {
        // logout
        logout: (state) => {
            state.sessionId = null;
            state.user = null;
            localStorage.removeItem('session_id');
        },
    },
    extraReducers: builder =>
        builder

            // fetchSessionAndUser
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

            // rehydrateSession
            .addCase(rehydrateSession.fulfilled, (state, action) => {
                state.sessionId = action.payload.sessionId;
                state.user = action.payload.user;
                state.isGuest = action.payload.isGuest;
            })
            .addCase(rehydrateSession.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(rehydrateSession.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
})

export const authActions = {
    ...authSlice.actions,
    fetchSessionAndUser,
    rehydrateSession,
};