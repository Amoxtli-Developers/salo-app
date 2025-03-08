"use client";

import React, { useEffect, useRef } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Sidebar from "@/components/Layout/Sidebar";
import Navbar from "@/components/Layout/Navbar";
import StatCard from "@/components/Dash/StatCard";
import { Thermometer, Droplet, ForkKnife, Users } from "lucide-react";
import HealthDistributionChart from "@/components/Dash/HealthDistributionChart";
import MortalityBirthTrendChart from "@/components/Dash/MortalityBirthTrendChart";
import PendingAlertsChart from "@/components/Dash/PendingAlertsChart";
import AxolotlInventoryCard, { AxolotlInventory } from "@/components/Dash/AxolotlInventoryCard";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { clearNotification } from "@/features/authSlice";
import { toast } from "react-toastify";

export default function Dashboard() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const notification = useSelector((state: RootState) => state.auth.notification);
  const user = useSelector((state: RootState) => state.auth.user);

  // Ref to avoid duplicate toasts
  const toastDisplayed = useRef(false);

  // When a notification exists, display a toast and then clear it.
  useEffect(() => {
    if (notification && !toastDisplayed.current) {
      toast.success(notification);
      toastDisplayed.current = true;
      dispatch(clearNotification());
    }
    // Reset ref if notification is cleared (for future notifications)
    if (!notification) {
      toastDisplayed.current = false;
    }
  }, [notification, dispatch]);

  const statCardsData = [
    {
      icon: <Thermometer size={24} color={theme.palette.primary.main} />,
      title: "Tank Temperature",
      value: "26°C",
      subValue: "+0.5°",
    },
    {
      icon: <Droplet size={24} color={theme.palette.primary.main} />,
      title: "pH Level",
      value: "7.5",
      subValue: "-0.2",
    },
    {
      icon: <ForkKnife size={24} color={theme.palette.primary.main} />,
      title: "Daily Feedings",
      value: "4",
      subValue: "No change",
    },
    {
      icon: <Users size={24} color={theme.palette.primary.main} />,
      title: "Population",
      value: "35 Axolotls",
      subValue: "+2",
    },
  ];

  const healthData = [
    { id: "Óptima", label: "Salud Óptima", value: 60, color: "#00C49F" },
    { id: "Observación", label: "En Observación", value: 25, color: "#FFBB28" },
    { id: "Tratamiento", label: "En Tratamiento", value: 15, color: "#FF8042" },
  ];

  const trendData = [
    {
      id: "Nacimientos",
      data: [
        { x: "Ene", y: 10 },
        { x: "Feb", y: 12 },
        { x: "Mar", y: 15 },
        { x: "Abr", y: 13 },
      ],
    },
    {
      id: "Muertes",
      data: [
        { x: "Ene", y: 2 },
        { x: "Feb", y: 3 },
        { x: "Mar", y: 5 },
        { x: "Abr", y: 4 },
      ],
    },
  ];

  const alertsData = [
    { category: "Vacunas", count: 3 },
    { category: "Revisiones Médicas", count: 5 },
    { category: "Apareamiento", count: 2 },
  ];

  const inventoryData: AxolotlInventory[] = [
    { id: 1, name: "Axolote A", health: "Salud Óptima", age: "2 años" },
    { id: 2, name: "Axolote B", health: "En Observación", age: "1.5 años" },
    { id: 3, name: "Axolote C", health: "En Tratamiento", age: "3 años" },
    { id: 4, name: "Axolote D", health: "Salud Óptima", age: "1 año" },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar on the left */}
      <Sidebar />
      {/* Main content area on the right */}
      <Box sx={{ flexGrow: 1 }}>
        <Navbar />
        {/* Page content container */}
        <Box sx={{ p: 2 }}>
          <Typography
            variant="h3"
            sx={{
              mb: 8,
              color: theme.palette.primary.main,
              fontWeight: "bold",
            }}
          >
            Hola {user?.displayName || "Usuario"}
          </Typography>
          <Grid container spacing={2}>
            {statCardsData.map((card, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <StatCard
                  icon={card.icon}
                  title={card.title}
                  value={card.value}
                  subValue={card.subValue}
                  sx={{ width: "100%" }}
                />
              </Grid>
            ))}
          </Grid>
          <Grid container spacing={4} mt={4}>
            <Grid item xs={12} md={8}>
              <MortalityBirthTrendChart data={trendData} />
            </Grid>
            <Grid item xs={12} md={4}>
              <HealthDistributionChart data={healthData} />
            </Grid>
            <Grid item xs={12} md={5}>
              <PendingAlertsChart data={alertsData} />
            </Grid>
            <Grid item xs={12} md={7}>
              <AxolotlInventoryCard data={inventoryData} />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
