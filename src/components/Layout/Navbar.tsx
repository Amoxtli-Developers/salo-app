// src/components/Layout/Navbar.tsx
"use client";

import React from "react";
import { AppBar, Toolbar, Box, InputBase } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import ProfileMenu from "@/components/Layout/ProfileMenu";
import ThemeSwitcher from "@/components/Layout/ThemeSwitcher";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { signOut } from "firebase/auth";
import { auth } from "@/utils/firebaseConfig"; // Ajusta la ruta según tu estructura
import { authRequestFailure, signOut as signOutAction } from "@/features/authSlice";

const Navbar: React.FC = () => {
  const theme = useTheme();
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
      dispatch(authRequestFailure(error.message));
    }
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor:
          theme.palette.mode === "dark" ? "#1e1e1e" : "#fbfbfb",
        boxShadow: 0,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Barra de búsqueda a la izquierda */}
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
        {/* Controles a la derecha */}
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
