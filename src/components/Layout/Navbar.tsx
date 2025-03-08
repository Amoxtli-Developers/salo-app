"use client";

import React from "react";
import { AppBar, Toolbar, Box, InputBase } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import ProfileMenu from "@/components/Layout/ProfileMenu"; // Adjust path accordingly
import ThemeSwitcher from "@/components/Layout/ThemeSwitcher";
import { useRouter } from "next/navigation";

const Navbar: React.FC = () => {
    const theme = useTheme();
    const router = useRouter();

    const handleProfileNavigation = () => {
        router.push("/perfil");
    };

    return (
        <AppBar
            position="static"
            sx={{
                backgroundColor: theme.palette.mode === 'dark' ? '#1e1e1e' : '#fbfbfb',
                boxShadow: 0,
            }}
        >
            <Toolbar sx={{ justifyContent: "space-between" }}>
                {/* Left-aligned Search Bar */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        borderRadius: 1,
                        pl: 1,
                        pr: 1,
                    }}
                >
                    <SearchIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                    <InputBase
                        placeholder="Buscar…"
                        sx={{
                            color: theme.palette.text.primary,
                            width: { xs: "120px", sm: "400px" },
                            height: "40px",
                        }}
                        inputProps={{ "aria-label": "buscar" }}
                    />
                </Box>
                {/* Right-aligned controls */}
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <ThemeSwitcher />
                    <ProfileMenu
                        userName="Juan Pérez"
                        userEmail="juan.perez@example.com"
                        userAvatar="/images/user-avatar.jpg"
                        onProfile={handleProfileNavigation}
                        onLogout={() => {
                            // Execute logout logic here
                        }}
                    />
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
