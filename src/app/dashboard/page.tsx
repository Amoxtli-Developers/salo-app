"use client";

import React, { useEffect, useRef, useState } from "react";
import { Box, Grid, Typography, Button, ButtonGroup } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Sidebar from "@/components/Layout/Sidebar";
import Navbar from "@/components/Layout/Navbar";
import StatCard from "@/components/Layout/StatCard";
import { ChartSpline, Shell, Component, BadgeAlert } from "lucide-react";
import dynamic from "next/dynamic"; // <-- Import dynamic
import { useRouter } from "next/navigation"; // Import router for navigation

// Dynamically import the chart components with SSR disabled
const HealthDistributionChart = dynamic(
    () => import("@/components/Dash/HealthDistributionChart"),
    { ssr: false }
);
const MortalityBirthTrendChart = dynamic(
    () => import("@/components/Dash/MortalityBirthTrendChart"),
    { ssr: false }
);
const PendingAlertsChart = dynamic(
    () => import("@/components/Dash/PendingAlertsChart"),
    { ssr: false }
);
const PopulationTrendChart = dynamic(
    () => import("@/components/Dash/PopulationTrendChart"),
    { ssr: false }
);
const SexDistributionChart = dynamic(
    () => import("@/components/Dash/SexDistributionChart"),
    { ssr: false }
);
const HealthInterventionsChart = dynamic(
    () => import("@/components/Dash/HealthInterventionsChart"),
    { ssr: false }
);

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { clearNotification } from "@/features/authSlice";
import { toast } from "react-toastify";

export default function Dashboard() {
    const theme = useTheme();
    const router = useRouter(); // Initialize router
    const dispatch = useDispatch();
    const notification = useSelector(
        (state: RootState) => state.auth.notification
    );
    const user = useSelector((state: RootState) => state.auth.user);

    const toastDisplayed = useRef(false);

    useEffect(() => {
        if (notification && !toastDisplayed.current) {
            toast.success(notification);
            toastDisplayed.current = true;
            dispatch(clearNotification());
        }
        if (!notification) {
            toastDisplayed.current = false;
        }
    }, [notification, dispatch]);

    // Global date filter
    const [dateFilter, setDateFilter] = useState("7d");
    const handleDateFilterChange = (filter: string) => {
        setDateFilter(filter);
    };

    // Dummy data
    const totalAlertasPendientes = 10;
    const statCardsData = [
        {
            icon: <ChartSpline size={24} color={theme.palette.primary.main} />,
            title: "Total de Ajolotes Registrados",
            value: "150",
            redirectPath: "/mis-axolotls",
        },
        {
            icon: <Shell size={24} color={theme.palette.primary.main} />,
            title: "Estanques",
            value: "10",
            redirectPath: "/estanques",
        },
        {
            icon: <Component size={24} color={theme.palette.primary.main} />,
            title: "Reproducciones Registradas",
            value: "5",
            redirectPath: "/reproduccion",
        },
        {
            icon: <BadgeAlert size={24} color={theme.palette.primary.main} />,
            title: "Alertas Pendientes",
            value: String(totalAlertasPendientes),
            redirectPath: "/alertas",
        },
    ];

    const trendData = [
        {
            id: "Nacimientos",
            data: [
                { x: "Ene", y: 10 },
                { x: "Feb", y: 12 },
                { x: "Mar", y: 15 },
                { x: "Abr", y: 13 },
                { x: "May", y: 16 },
                { x: "Jun", y: 14 },
            ],
        },
        {
            id: "Muertes",
            data: [
                { x: "Ene", y: 2 },
                { x: "Feb", y: 3 },
                { x: "Mar", y: 5 },
                { x: "Abr", y: 4 },
                { x: "May", y: 3 },
                { x: "Jun", y: 4 },
            ],
        },
    ];

    const healthData = [
        { id: "Óptima", label: "Salud Óptima", value: 60, color: "#00C49F" },
        {
            id: "Observación",
            label: "En Observación",
            value: 25,
            color: "#FFBB28",
        },
        {
            id: "Tratamiento",
            label: "En Tratamiento",
            value: 15,
            color: "#FF8042",
        },
    ];

    const alertsData = [
        { category: "Vacunas", count: 3 },
        { category: "Revisiones Médicas", count: 5 },
        { category: "Apareamiento", count: 2 },
    ];

    const populationTrendData = [
        {
            id: "Población Total",
            data: [
                { x: "Ene", y: 150 },
                { x: "Feb", y: 155 },
                { x: "Mar", y: 160 },
                { x: "Abr", y: 158 },
                { x: "May", y: 162 },
                { x: "Jun", y: 165 },
            ],
        },
    ];

    const sexDistributionData = [
        { id: "Masculino", label: "Masculino", value: 80, color: "#1E90FF" },
        { id: "Femenino", label: "Femenino", value: 70, color: "#FF69B4" },
    ];

    const interventionsData = [
        {
            id: "Vacunación",
            data: [
                { x: "Ene", y: 5 },
                { x: "Feb", y: 6 },
                { x: "Mar", y: 7 },
                { x: "Abr", y: 4 },
                { x: "May", y: 8 },
                { x: "Jun", y: 6 },
            ],
        },
        {
            id: "Chequeo",
            data: [
                { x: "Ene", y: 3 },
                { x: "Feb", y: 4 },
                { x: "Mar", y: 3 },
                { x: "Abr", y: 5 },
                { x: "May", y: 4 },
                { x: "Jun", y: 5 },
            ],
        },
        {
            id: "Tratamiento",
            data: [
                { x: "Ene", y: 2 },
                { x: "Feb", y: 1 },
                { x: "Mar", y: 2 },
                { x: "Abr", y: 3 },
                { x: "May", y: 2 },
                { x: "Jun", y: 3 },
            ],
        },
    ];

    return (
        <Box sx={{ display: "flex" }}>
            <Sidebar />
            <Box sx={{ flexGrow: 1 }}>
                <Navbar />
                <Box sx={{ p: 2 }}>
                    <Box
                        sx={{
                            mb: 6,
                            p: 3,
                            borderRadius: "15px",
                            background:
                                theme.palette.mode === "dark"
                                    ? "linear-gradient(90deg, rgba(18,18,18,0.8) 0%, rgba(255,111,97,0.1) 100%)"
                                    : "linear-gradient(90deg, rgba(251,251,251,0.8) 0%, rgba(255,111,97,0.1) 100%)",
                            border: `1px solid ${
                                theme.palette.mode === "dark"
                                    ? "rgba(255,111,97,0.2)"
                                    : "rgba(255,111,97,0.3)"
                            }`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <Box>
                            <Typography
                                variant="h3"
                                sx={{
                                    fontWeight: "bold",
                                    color: theme.palette.primary.main,
                                }}
                            >
                                ¡Bienvenido, {user?.displayName || "Usuario"}!
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    mt: 1,
                                    color: theme.palette.text.secondary,
                                }}
                            >
                                {new Date().toLocaleDateString("es-ES", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </Typography>
                        </Box>
                    </Box>

                    {/* Date Filter */}
                    <Box
                        sx={{
                            mb: 4,
                            display: "flex",
                            justifyContent: "flex-end",
                        }}
                    >
                        <ButtonGroup variant="outlined" size="small">
                            <Button
                                variant={
                                    dateFilter === "7d"
                                        ? "contained"
                                        : "outlined"
                                }
                                onClick={() => handleDateFilterChange("7d")}
                            >
                                Últimos 7 días
                            </Button>
                            <Button
                                variant={
                                    dateFilter === "1m"
                                        ? "contained"
                                        : "outlined"
                                }
                                onClick={() => handleDateFilterChange("1m")}
                            >
                                Último mes
                            </Button>
                            <Button
                                variant={
                                    dateFilter === "3m"
                                        ? "contained"
                                        : "outlined"
                                }
                                onClick={() => handleDateFilterChange("3m")}
                            >
                                Último trimestre
                            </Button>
                            <Button
                                variant={
                                    dateFilter === "1y"
                                        ? "contained"
                                        : "outlined"
                                }
                                onClick={() => handleDateFilterChange("1y")}
                            >
                                Último año
                            </Button>
                        </ButtonGroup>
                    </Box>

                    {/* Stat Cards */}
                    <Grid container spacing={2} sx={{ mb: 6 }}>
                        {statCardsData.map((card, index) => (
                            <Grid item xs={12} sm={6} md={3} key={index}>
                                <StatCard
                                    icon={card.icon}
                                    title={card.title}
                                    value={card.value}
                                    sx={{ width: "100%" }}
                                    onRedirect={
                                        card.redirectPath
                                            ? () =>
                                                  router.push(card.redirectPath)
                                            : undefined
                                    }
                                />
                            </Grid>
                        ))}
                    </Grid>

                    {/* Charts */}
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={7}>
                            <MortalityBirthTrendChart data={trendData} />
                        </Grid>
                        <Grid item xs={12} md={5}>
                            <HealthDistributionChart data={healthData} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <PendingAlertsChart data={alertsData} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <PopulationTrendChart data={populationTrendData} />
                        </Grid>
                        <Grid item xs={12} md={5}>
                            <SexDistributionChart data={sexDistributionData} />
                        </Grid>
                        <Grid item xs={12} md={7}>
                            <HealthInterventionsChart
                                data={interventionsData}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
}
