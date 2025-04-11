"use client";

import React, { useEffect, useRef, useState } from "react";
import { Box, Grid, Typography, Button, ButtonGroup } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Sidebar from "@/components/Layout/Sidebar";
import Navbar from "@/components/Layout/Navbar";
import StatCard from "@/components/Dash/StatCard";
import { Users, HeartPulse, ForkKnife, AlertTriangle } from "lucide-react";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";

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

export default function Dashboard() {
    const theme = useTheme();
    const toastDisplayed = useRef(false);

    // Global date filter
    const [dateFilter, setDateFilter] = useState("7d");
    const handleDateFilterChange = (filter: string) => {
        setDateFilter(filter);
    };

    // Dummy data
    const totalAlertasPendientes = 10;
    const statCardsData = [
        {
            icon: <Users size={24} color={theme.palette.primary.main} />,
            title: "Total de Ajolotes Registrados",
            value: "150",
        },
        {
            icon: <HeartPulse size={24} color={theme.palette.primary.main} />,
            title: "Nuevos Ingresos",
            value: "10",
        },
        {
            icon: <ForkKnife size={24} color={theme.palette.primary.main} />,
            title: "Reproducciones Registradas",
            value: "5",
        },
        {
            icon: (
                <AlertTriangle size={24} color={theme.palette.primary.main} />
            ),
            title: "Alertas Pendientes",
            value: String(totalAlertasPendientes),
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
                    <Typography
                        variant="h5"
                        sx={{
                            mb: 6,
                            color: theme.palette.primary.main,
                            fontWeight: "bold",
                        }}
                    >
                        ¡Bienvenido, {"Usuario"}! Tienes{" "}
                        {totalAlertasPendientes} alertas pendientes hoy.
                    </Typography>

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
                    <Grid container spacing={2}>
                        {statCardsData.map((card, index) => (
                            <Grid item xs={12} sm={6} md={3} key={index}>
                                <StatCard
                                    icon={card.icon}
                                    title={card.title}
                                    value={card.value}
                                    sx={{ width: "100%" }}
                                />
                            </Grid>
                        ))}
                    </Grid>

                    {/* Charts */}
                    <Grid container spacing={4} mt={4}>
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
