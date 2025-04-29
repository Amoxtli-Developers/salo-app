"use client";

import React from "react";
import { AppBar, Toolbar, Box } from "@mui/material";
import ProfileMenu from "@/components/Layout/ProfileMenu";
import ThemeSwitcher from "@/components/Layout/ThemeSwitcher";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { signOut } from "firebase/auth";
import { auth } from "@/utils/firebaseConfig";
import {
    authRequestFailure,
    signOut as signOutAction,
} from "@/features/authSlice";

const Navbar: React.FC = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user);

    const handleProfileNavigation = () => {
        router.push("/perfil");
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            // Limpia el estado de Redux
            dispatch(signOutAction());
            // Limpia la cookie del token (si la usas)
            document.cookie =
                "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
            // Redirige al login
            router.push("/");
        } catch (error: any) {
            // eslint-disable-line
            dispatch(authRequestFailure(error.message));
        }
    };

    return (
        <AppBar position="static" color="inherit" elevation={0}>
            <Toolbar sx={{ justifyContent: "flex-end" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <ThemeSwitcher />
                    <ProfileMenu
                        userName={user?.displayName || "Usuario"}
                        userEmail={user?.email || ""}
                        userAvatar={user?.photoUrl || undefined}
                        onProfile={handleProfileNavigation}
                        onLogout={handleLogout}
                    />
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
