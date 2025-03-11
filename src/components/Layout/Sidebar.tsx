"use client";

import React, { useState, useEffect } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import completeLogo from "@/assets/logos/color-logo.svg";
import smallLogo from "@/assets/logos/color-small-logo.svg";

// Lucide icons
import { LayoutDashboard, Users, Heart, Table, AlertTriangle, Settings } from "lucide-react";

const Sidebar: React.FC = () => {
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname(); // Get current route path
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [collapsed, setCollapsed] = useState(isMobile);
  const [activeKey, setActiveKey] = useState("1");

  // Effect to auto-collapse on mobile
  useEffect(() => {
    setCollapsed(isMobile);
  }, [isMobile]);

  // Keep the activeKey in sync with the current route
  useEffect(() => {
    if (pathname.startsWith("/dashboard")) setActiveKey("1");
    else if (pathname.startsWith("/mis-axolotls")) setActiveKey("2");
    else if (pathname.startsWith("/reproduccion")) setActiveKey("3");
    else if (pathname.startsWith("/reportes")) setActiveKey("4");
    else if (pathname.startsWith("/alertas")) setActiveKey("5");
    else if (pathname.startsWith("/configuracion")) setActiveKey("6");
    else setActiveKey("");
  }, [pathname]);

  const toggleCollapse = () => {
    setCollapsed((prev) => !prev);
  };

  const drawerWidth = collapsed ? 80 : 250;

  // Only change background color when selected.
  const getSelectedStyles = (key: string) =>
    activeKey === key ? { backgroundColor: "primary.main" } : {};

  // Handle navigation
  const handleNavigation = (key: string, path: string) => {
    router.push(path);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          transition: "width 0.3s",
        },
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        {/* Top: App Logo and current path */}
        <Box sx={{ p: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Image
            src={collapsed ? smallLogo : completeLogo}
            alt="App Logo"
            width={collapsed ? 40 : 100}
            height={collapsed ? 40 : 50}
          />
          
        </Box>
        {/* Middle: Navigation Area */}
        <Box sx={{ flexGrow: 1, position: "relative" }}>
          <List>
            <ListItem disablePadding>
              <ListItemButton
                selected={activeKey === "1"}
                onClick={() => handleNavigation("1", "/dashboard")}
                sx={{
                  justifyContent: collapsed ? "center" : "flex-start",
                  ...getSelectedStyles("1"),
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: collapsed ? "auto" : undefined,
                    color: "inherit",
                  }}
                >
                  <LayoutDashboard size={24} stroke="currentColor" />
                </ListItemIcon>
                {!collapsed && <ListItemText primary="Dashboard" />}
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                selected={activeKey === "2"}
                onClick={() => handleNavigation("2", "/mis-axolotls")}
                sx={{
                  justifyContent: collapsed ? "center" : "flex-start",
                  ...getSelectedStyles("2"),
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: collapsed ? "auto" : undefined,
                    color: "inherit",
                  }}
                >
                  <Users size={24} stroke="currentColor" />
                </ListItemIcon>
                {!collapsed && <ListItemText primary="Mis Axolotls" />}
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                selected={activeKey === "3"}
                onClick={() => handleNavigation("3", "/reproduccion")}
                sx={{
                  justifyContent: collapsed ? "center" : "flex-start",
                  ...getSelectedStyles("3"),
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: collapsed ? "auto" : undefined,
                    color: "inherit",
                  }}
                >
                  <Heart size={24} stroke="currentColor" />
                </ListItemIcon>
                {!collapsed && <ListItemText primary="Reproducción" />}
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                selected={activeKey === "4"}
                onClick={() => handleNavigation("4", "/reportes")}
                sx={{
                  justifyContent: collapsed ? "center" : "flex-start",
                  ...getSelectedStyles("4"),
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: collapsed ? "auto" : undefined,
                    color: "inherit",
                  }}
                >
                  <Table size={24} stroke="currentColor" />
                </ListItemIcon>
                {!collapsed && <ListItemText primary="Reportes" />}
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                selected={activeKey === "5"}
                onClick={() => handleNavigation("5", "/alertas")}
                sx={{
                  justifyContent: collapsed ? "center" : "flex-start",
                  ...getSelectedStyles("5"),
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: collapsed ? "auto" : undefined,
                    color: "inherit",
                  }}
                >
                  <AlertTriangle size={24} stroke="currentColor" />
                </ListItemIcon>
                {!collapsed && <ListItemText primary="Alertas" />}
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                selected={activeKey === "6"}
                onClick={() => handleNavigation("6", "/configuracion")}
                sx={{
                  justifyContent: collapsed ? "center" : "flex-start",
                  ...getSelectedStyles("6"),
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: collapsed ? "auto" : undefined,
                    color: "inherit",
                  }}
                >
                  <Settings size={24} stroke="currentColor" />
                </ListItemIcon>
                {!collapsed && <ListItemText primary="Configuración" />}
              </ListItemButton>
            </ListItem>
          </List>

          {/* Collapsible Toggle Icon */}
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: 0,
              right: 0,
              display: "flex",
              justifyContent: "right",
              transform: "translateY(-50%)",
            }}
          >
            <IconButton onClick={toggleCollapse}>
              {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
