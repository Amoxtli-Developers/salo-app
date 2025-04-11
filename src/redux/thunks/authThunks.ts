// src/utils/thunks/authThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    startLoading,
    stopLoading,
    setError,
    setCredentials,
    clearCredentials,
} from "@/redux/features/authSlice";
import { getFriendlyFirebaseError } from "@/utils/firebaseErrors";

interface LoginPayload {
    email: string;
    password: string;
}

interface RegisterPayload {
    email: string;
    password: string;
}

export const loginThunk = createAsyncThunk(
    "auth/login",
    async ({ email, password }: LoginPayload, { dispatch }) => {
        try {
            dispatch(startLoading());

            const res = await fetch("/api/auth", {
                method: "POST",
                body: JSON.stringify({
                    action: "login",
                    email,
                    password,
                }),
                headers: { "Content-Type": "application/json" },
            });

            const data = await res.json();

            if (!data.ok) {
                throw new Error(data.error || "Error en login");
            }

            // Guardar en redux
            dispatch(
                setCredentials({
                    token: data.token,
                    user: data.user,
                })
            );
        } catch (error: any) {
            dispatch(setError(getFriendlyFirebaseError(error.message)));
        } finally {
            dispatch(stopLoading());
        }
    }
);

export const registerThunk = createAsyncThunk(
    "auth/register",
    async ({ email, password }: RegisterPayload, { dispatch }) => {
        try {
            dispatch(startLoading());

            const res = await fetch("/api/auth", {
                method: "POST",
                body: JSON.stringify({
                    action: "register",
                    email,
                    password,
                }),
                headers: { "Content-Type": "application/json" },
            });

            const data = await res.json();
            if (!data.ok) {
                throw new Error(data.error || "Error en registro");
            }

            dispatch(
                setCredentials({
                    token: data.token,
                    user: data.user,
                })
            );
        } catch (error: any) {
            dispatch(setError(getFriendlyFirebaseError(error.message)));
        } finally {
            dispatch(stopLoading());
        }
    }
);

export const googleLoginThunk = createAsyncThunk(
    "auth/googleLogin",
    async (_, { dispatch }) => {
        try {
            dispatch(startLoading());

            const res = await fetch("/api/auth", {
                method: "POST",
                body: JSON.stringify({
                    action: "google",
                }),
                headers: { "Content-Type": "application/json" },
            });

            const data = await res.json();
            if (!data.ok) {
                throw new Error(data.error || "Error en Google Login");
            }

            dispatch(
                setCredentials({
                    token: data.token,
                    user: data.user,
                })
            );
        } catch (error: any) {
            dispatch(setError(getFriendlyFirebaseError(error.message)));
        } finally {
            dispatch(stopLoading());
        }
    }
);

export const logoutThunk = createAsyncThunk(
    "auth/logout",
    async (_, { dispatch }) => {
        try {
            dispatch(startLoading());

            const res = await fetch("/api/auth", {
                method: "POST",
                body: JSON.stringify({
                    action: "logout",
                }),
                headers: { "Content-Type": "application/json" },
            });

            const data = await res.json();
            if (!data.ok) {
                throw new Error(data.error || "Error en logout");
            }

            dispatch(clearCredentials());
        } catch (error: any) {
            dispatch(setError(getFriendlyFirebaseError(error.message)));
        } finally {
            dispatch(stopLoading());
        }
    }
);
