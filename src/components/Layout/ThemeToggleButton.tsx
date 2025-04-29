"use client";

import React from "react";
import { IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Sun, Moon } from "lucide-react";

interface ThemeToggleButtonProps {
    isDarkMode: boolean;
    onClick: () => void;
}

const ThemeToggleButton: React.FC<ThemeToggleButtonProps> = ({
    isDarkMode,
    onClick,
}) => {
    const theme = useTheme();

    return (
        <IconButton
            onClick={onClick}
            aria-label="toggle dark mode"
            sx={{
                color: theme.palette.text.primary,
                transition: "all 0.3s ease",
                "&:hover": {
                    transform: "rotate(30deg)",
                },
            }}
        >
            {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
        </IconButton>
    );
};

export default ThemeToggleButton;
