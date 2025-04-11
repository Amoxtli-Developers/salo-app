"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/redux/store"; // Ajusta la ruta según tu estructura
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { lightTheme, darkTheme } from "../theme"; // Ajusta la ruta según tu estructura
import RemoveSsrStyles from "./RemoveSsrStyles"; // Ajusta la ruta según tu estructura

interface ThemeContextType {
    isDarkMode: boolean;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
    isDarkMode: false,
    toggleTheme: () => {},
});

export function useThemeContext() {
    return useContext(ThemeContext);
}

interface ProvidersProps {
    children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const toggleTheme = () => setIsDarkMode((prev) => !prev);
    const currentTheme = isDarkMode ? darkTheme : lightTheme;

    return (
        <ReduxProvider store={store}>
            <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
                <ThemeProvider theme={currentTheme}>
                    <CssBaseline />
                    <RemoveSsrStyles />
                    {children}
                </ThemeProvider>
            </ThemeContext.Provider>
        </ReduxProvider>
    );
}
