"use client";

import React, { useState } from "react";
import {
    Menu,
    MenuItem,
    Avatar,
    Box,
    Typography,
    Divider,
} from "@mui/material";
import { useRouter } from "next/navigation";

interface ProfileMenuProps {
    userName?: string;
    userEmail?: string;
    userAvatar?: string; // URL for the avatar image
    onLogout: () => void;
    onProfile?: () => void;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({
    userName = "Juan Pérez",
    userEmail = "juan.perez@example.com",
    userAvatar,
    onLogout,
    onProfile,
}) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const router = useRouter();

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleProfile = () => {
        handleClose();
        // If an onProfile prop is provided, call it;
        // otherwise, navigate to "/perfil"
        if (onProfile) {
            onProfile();
        } else {
            router.push("/perfil");
        }
    };

    return (
        <>
            <Box
                onClick={handleOpen}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    p: 1,
                }}
            >
                <Avatar src={userAvatar} alt={userName}>
                    {userName.charAt(0)}
                </Avatar>
                <Typography
                    variant="subtitle2"
                    sx={{ ml: 1, display: { xs: "none", sm: "block" } }}
                >
                    {userName}
                </Typography>
            </Box>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                    sx: {
                        width: 250,
                        p: 1,
                    },
                }}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        p: 2,
                    }}
                >
                    <Avatar src={userAvatar} alt={userName} sx={{ width: 56, height: 56 }} />
                    <Typography variant="subtitle1" sx={{ mt: 1 }}>
                        {userName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {userEmail}
                    </Typography>
                </Box>
                <Divider />
                <MenuItem onClick={handleProfile}>Perfil</MenuItem>
                <MenuItem
                    onClick={() => {
                        handleClose();
                        onLogout();
                    }}
                >
                    Cerrar sesión
                </MenuItem>
            </Menu>
        </>
    );
};

export default ProfileMenu;
