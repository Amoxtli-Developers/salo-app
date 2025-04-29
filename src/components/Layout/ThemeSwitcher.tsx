"use client";

import React from "react";
import { useThemeContext } from "../../app/providers";
import ThemeToggleButton from "./ThemeToggleButton";

export default function ThemeSwitcher() {
    const { isDarkMode, toggleTheme } = useThemeContext();

    return <ThemeToggleButton isDarkMode={isDarkMode} onClick={toggleTheme} />;
}
