"use client";

import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import AuthForm, { AuthFormInputs } from "@/components/Auth/AuthForm";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
    loginThunk,
    registerThunk,
    googleLoginThunk,
} from "@/redux/thunks/authThunks";
import { getFriendlyFirebaseError } from "@/utils/firebaseErrors";
import { toast } from "react-toastify";

export default function Auth() {
    const dispatch = useAppDispatch();
    const { loading, error } = useAppSelector((state) => state.auth);
    const [isSignUp, setIsSignUp] = useState(false);

    const toggleSignUp = () => setIsSignUp((prev) => !prev);

    const handleFormSubmit = (data: AuthFormInputs) => {
        if (isSignUp) {
            dispatch(
                registerThunk({ email: data.email, password: data.password })
            );
        } else {
            dispatch(
                loginThunk({ email: data.email, password: data.password })
            );
        }
    };

    const handleGoogleLogin = () => {
        dispatch(googleLoginThunk());
    };

    useEffect(() => {
        if (error) {
            const friendlyError = getFriendlyFirebaseError(error);
            toast.error(friendlyError);
        }
    }, [error]);

    return (
        <Box>
            <AuthForm
                isSignUp={isSignUp}
                loading={loading}
                error={""}
                onSubmit={handleFormSubmit}
                onGoogleLogin={handleGoogleLogin}
                toggleSignUp={toggleSignUp}
            />
        </Box>
    );
}
