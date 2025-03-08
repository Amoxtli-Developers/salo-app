// src/components/ThemeSwitcher.tsx
"use client";

import React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useThemeContext } from "../../app/providers";
import MaterialUISwitch from "./MaterialUISwitch";

export default function ThemeSwitcher() {
  const { isDarkMode, toggleTheme } = useThemeContext();

  return (
    <FormControlLabel
      control={
        <MaterialUISwitch 
          checked={isDarkMode} 
          onChange={toggleTheme} 
        />
      }
      label={''}
    />
  );
}
