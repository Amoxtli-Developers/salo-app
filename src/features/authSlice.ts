// src/features/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getFriendlyFirebaseError } from "@/utils/firebaseErrors";

interface User {
  uid: string;
  email?: string | null;
  displayName?: string | null;
  photoUrl?: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  notification: string | null;
  verificationPending: boolean; 
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  notification: null,
  verificationPending: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authRequestStart(state) {
      state.loading = true;
      state.error = null;
      state.notification = null;
    },
    authRequestSuccess(state, action: PayloadAction<User>) {
      state.loading = false;
      state.user = action.payload;
      state.notification = "Iniciaste sesión correctamente";
    },
    authRequestFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      // Transform the error message using our helper
      state.error = getFriendlyFirebaseError(action.payload);
      state.notification = null;
    },
    setVerificationPending(state, action: PayloadAction<boolean>) {
      state.verificationPending = action.payload;
    },
    clearNotification(state) {
      state.notification = null;
    },
    signOut(state) {
      state.user = null;
      state.notification = null;
    },
  },
});

export const {
  authRequestStart,
  authRequestSuccess,
  authRequestFailure,
  clearNotification,
  setVerificationPending,
  signOut,
} = authSlice.actions;
export default authSlice.reducer;
