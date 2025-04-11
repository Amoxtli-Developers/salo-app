// src/redux/features/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    token: string | null;
    user: {
        uid: string;
        email: string | null;
        displayName?: string | null;
    } | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    token: null,
    user: null,
    loading: false,
    error: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        startLoading: (state) => {
            state.loading = true;
            state.error = null;
        },
        stopLoading: (state) => {
            state.loading = false;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        setCredentials: (
            state,
            action: PayloadAction<{ token: string; user: AuthState["user"] }>
        ) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.loading = false;
            state.error = null;
        },
        clearCredentials: (state) => {
            state.token = null;
            state.user = null;
            state.error = null;
            state.loading = false;
        },
    },
});

export const {
    startLoading,
    stopLoading,
    setError,
    setCredentials,
    clearCredentials,
} = authSlice.actions;

export default authSlice.reducer;
