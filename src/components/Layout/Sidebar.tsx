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
import { useRouter } from "next/navigation";
import completeLogo from "@/assets/logos/color-logo.svg";
import smallLogo from "@/assets/logos/color-small-logo.svg";

// Import Lucide icons
import { LayoutDashboard, Users, Table, Settings } from "lucide-react";

const Sidebar: React.FC = () => {
    const router = useRouter();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [collapsed, setCollapsed] = useState(isMobile);
    const [activeKey, setActiveKey] = useState("1");

    // Effect to auto-collapse on mobile
    useEffect(() => {
        setCollapsed(isMobile);
    }, [isMobile]);

    const toggleCollapse = () => {
        setCollapsed((prev) => !prev);
    };

    const drawerWidth = collapsed ? 80 : 250;

    // Only change the background color when selected.
    const getSelectedStyles = (key: string) =>
        activeKey === key ? { backgroundColor: "primary.main" } : {};

    // Handle navigation
    const handleNavigation = (key: string, path: string) => {
        setActiveKey(key);
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
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                }}
            >
                {/* Top: App Logo */}
                <Box sx={{ p: 1, display: "flex", justifyContent: "center" }}>
                    <Image
                        src={collapsed ? smallLogo : completeLogo}
                        alt="App Logo"
                        width={collapsed ? 40 : 100}
                        height={collapsed ? 40 : 50}
                    />
                </Box>
                {/* Middle: Navigation Area */}
                <Box
                    sx={{
                        flexGrow: 1,
                        position: "relative",
                    }}
                >
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton
                                selected={activeKey === "1"}
                                onClick={() =>
                                    handleNavigation("1", "/dashboard")
                                }
                                sx={{
                                    justifyContent: collapsed ? "center" : "flex-start",
                                    ...getSelectedStyles("1"),
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: collapsed ? "auto" : undefined,
                                        color: "text.primary",
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
                                onClick={() =>
                                    handleNavigation("2", "/mis-axolotls")
                                }
                                sx={{
                                    justifyContent: collapsed ? "center" : "flex-start",
                                    ...getSelectedStyles("2"),
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: collapsed ? "auto" : undefined,
                                        color: "text.primary",
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
                                onClick={() =>
                                    handleNavigation("3", "/reportes")
                                }
                                sx={{
                                    justifyContent: collapsed ? "center" : "flex-start",
                                    ...getSelectedStyles("3"),
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: collapsed ? "auto" : undefined,
                                        color: "text.primary",
                                    }}
                                >
                                    <Table size={24} stroke="currentColor" />
                                </ListItemIcon>
                                {!collapsed && <ListItemText primary="Reportes" />}
                            </ListItemButton>
                        </ListItem>

                        <ListItem disablePadding>
                            <ListItemButton
                                selected={activeKey === "4"}
                                onClick={() =>
                                    handleNavigation("4", "/configuracion")
                                }
                                sx={{
                                    justifyContent: collapsed ? "center" : "flex-start",
                                    ...getSelectedStyles("4"),
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: collapsed ? "auto" : undefined,
                                        color: "text.primary",
                                    }}
                                >
                                    <Settings size={24} stroke="currentColor" />
                                </ListItemIcon>
                                {!collapsed && <ListItemText primary="Configuración" />}
                            </ListItemButton>
                        </ListItem>
                    </List>
                    {/* Collapsible Toggle Icon in the middle of nav area */}
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
                            {collapsed ? (
                                <ChevronRightIcon />
                            ) : (
                                <ChevronLeftIcon />
                            )}
                        </IconButton>
                    </Box>
                </Box>
            </Box>
        </Drawer>
    );
};

export default Sidebar;
