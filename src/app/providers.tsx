// src/app/providers.tsx
"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Provider as ReduxProvider } from "react-redux";
import store from "@/store"; // Asegúrate de que la ruta sea correcta
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { lightTheme, darkTheme } from "../theme";
import RemoveSsrStyles from "./RemoveSsrStyles";

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

export default function Providers({ children }: { children: ReactNode }) {
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
