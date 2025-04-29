"use client";

import React, { useState } from "react";
import {
    Box,
    Typography,
    Button,
    Stack,
    Grid,
    Card,
    alpha,
    Chip,
    Collapse,
    Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Layout/Sidebar";
import Navbar from "@/components/Layout/Navbar";
import ReproductionFilters from "@/components/Reproduction/ReproductionFilters";
import ReproductionEventsTable, {
    ReproduccionEvent,
} from "@/components/Reproduction/ReproductionEventsTable";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";
import StatCard from "@/components/Layout/StatCard";
import {
    ChartSpline,
    Heart,
    Loader,
    CirclePercent,
    Plus,
    FileText,
    ChevronDown,
    ChevronUp,
    Filter,
    Calendar,
} from "lucide-react";

const ReproductionCharts = dynamic(
    () => import("@/components/Reproduction/ReproductionCharts"),
    { ssr: false }
);

export default function ReproduccionPage() {
    const theme = useTheme();
    const router = useRouter();
    const [filtersExpanded, setFiltersExpanded] = useState(false);

    // Global filters state
    const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
        null,
        null,
    ]);
    const [estadoEvento, setEstadoEvento] = useState("");
    const [tipoReproduccion, setTipoReproduccion] = useState("");
    const [resultado, setResultado] = useState("");

    // Check if any filters are active
    const isFilterActive =
        dateRange[0] !== null ||
        dateRange[1] !== null ||
        estadoEvento !== "" ||
        tipoReproduccion !== "" ||
        resultado !== "";

    // Toggle filters visibility
    const toggleFilters = () => {
        setFiltersExpanded(!filtersExpanded);
    };

    // Clear all filters
    const clearFilters = () => {
        setDateRange([null, null]);
        setEstadoEvento("");
        setTipoReproduccion("");
        setResultado("");
    };

    // Dummy reproduction events data
    const [events, setEvents] = useState<ReproduccionEvent[]>([
        {
            id: 1,
            progenitores: "AX001 - AX005",
            fechaProgramada: "2023-07-15",
            estado: "Programado",
            resultado: "Sin Resultado",
        },
        {
            id: 2,
            progenitores: "AX002 - AX006",
            fechaProgramada: "2023-06-20",
            estado: "Finalizado",
            resultado: "Exitoso",
        },
        {
            id: 3,
            progenitores: "AX003 - AX007",
            fechaProgramada: "2023-07-10",
            estado: "En Proceso",
            resultado: "Sin Resultado",
        },
        // ... add more events as needed
    ]);

    // Filter events based on global filters
    const filteredEvents = events.filter((ev) => {
        if (dateRange[0] && new Date(ev.fechaProgramada) < dateRange[0])
            return false;
        if (dateRange[1] && new Date(ev.fechaProgramada) > dateRange[1])
            return false;
        if (estadoEvento && ev.estado !== estadoEvento) return false;
        if (tipoReproduccion && !ev.progenitores.includes(tipoReproduccion))
            return false;
        if (resultado && ev.resultado !== resultado) return false;
        return true;
    });

    // Calculate KPI data
    const totalEvents = events.length;
    const eventosEnProgreso = events.filter(
        (ev) => ev.estado === "En Proceso"
    ).length;
    const eventosFinalizados = events.filter(
        (ev) => ev.estado === "Finalizado"
    ).length;
    const eventosExitosos = events.filter(
        (ev) => ev.resultado === "Exitoso"
    ).length;
    const rangoExito =
        eventosFinalizados > 0
            ? Math.round((eventosExitosos / eventosFinalizados) * 100)
            : 0;

    // Get unique pairings by counting unique progenitor combinations
    const uniquePairings = new Set(events.map((ev) => ev.progenitores)).size;

    // StatCard data with improved calculations
    const statCardsData = [
        {
            icon: <ChartSpline size={24} color={theme.palette.primary.main} />,
            title: "Total de Eventos",
            value: totalEvents.toString(),
        },
        {
            icon: <Heart size={24} color={theme.palette.primary.main} />,
            title: "Parejas Únicas",
            value: uniquePairings.toString(),
        },
        {
            icon: <Loader size={24} color={theme.palette.primary.main} />,
            title: "Eventos en Progreso",
            value: eventosEnProgreso.toString(),
        },
        {
            icon: (
                <CirclePercent size={24} color={theme.palette.primary.main} />
            ),
            title: "Rango de Éxito",
            value: `${rangoExito}%`,
        },
    ];

    return (
        <Box sx={{ display: "flex" }}>
            <Sidebar />
            <Box
                sx={{
                    flexGrow: 1,
                    bgcolor: "background.default",
                    minHeight: "100vh",
                }}
            >
                <Navbar />
                <Box sx={{ p: 3 }}>
                    {/* Header with enhanced styling */}
                    <Box
                        sx={{
                            mb: 4,
                        }}
                    >
                        <Stack
                            direction={{ xs: "column", md: "row" }}
                            justifyContent="space-between"
                            alignItems={{ xs: "flex-start", md: "center" }}
                            spacing={2}
                        >
                            <Box sx={{ flex: 1 }}>
                                <Typography
                                    variant="h4"
                                    sx={{
                                        fontWeight: "bold",
                                        color: theme.palette.primary.main,
                                    }}
                                >
                                    Control de Reproducción
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ mt: 1, maxWidth: "800px" }}
                                >
                                    Gestiona y monitorea los eventos
                                    reproductivos de tus ajolotes. Consulta el
                                    historial de parejas, eventos programados y
                                    resultados, y toma decisiones basadas en
                                    datos actualizados.
                                </Typography>
                            </Box>
                            <Stack
                                direction={{ xs: "column", sm: "row" }}
                                spacing={2}
                                sx={{ mt: { xs: 2, md: 0 } }}
                            >
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<Plus size={18} />}
                                    onClick={() =>
                                        router.push("/reproduccion/registrar")
                                    }
                                    sx={{
                                        px: 3,
                                        borderRadius: 2,
                                        boxShadow: "none",
                                    }}
                                >
                                    Nuevo Evento
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    startIcon={<FileText size={18} />}
                                    sx={{
                                        px: 3,
                                        borderRadius: 2,
                                    }}
                                >
                                    Exportar Datos
                                </Button>
                            </Stack>
                        </Stack>
                    </Box>

                    {/* KPI Cards */}
                    <Grid container spacing={3} sx={{ mb: 6 }}>
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

                    {/* Filters Panel */}
                    <Card
                        sx={{
                            mb: 3,
                            p: 2,
                            borderRadius: 3,
                            border: `1px solid ${theme.palette.divider}`,
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Filter
                                    size={20}
                                    color={theme.palette.primary.main}
                                    style={{ marginRight: "8px" }}
                                />
                                <Typography
                                    variant="subtitle1"
                                    fontWeight="medium"
                                >
                                    Filtros
                                </Typography>
                                {isFilterActive && (
                                    <Chip
                                        label={`${filteredEvents.length} resultados`}
                                        size="small"
                                        color="primary"
                                        sx={{ ml: 2, height: "22px" }}
                                    />
                                )}
                            </Box>

                            <Box>
                                <Button
                                    onClick={toggleFilters}
                                    startIcon={
                                        filtersExpanded ? (
                                            <ChevronUp size={18} />
                                        ) : (
                                            <ChevronDown size={18} />
                                        )
                                    }
                                    variant="text"
                                    color="primary"
                                    sx={{
                                        textTransform: "none",
                                        fontWeight: 500,
                                        mr: 1,
                                    }}
                                >
                                    {filtersExpanded ? "Ocultar" : "Mostrar"}
                                </Button>

                                {isFilterActive && (
                                    <Button
                                        size="small"
                                        onClick={clearFilters}
                                        sx={{
                                            textTransform: "none",
                                            fontWeight: "medium",
                                        }}
                                    >
                                        Limpiar filtros
                                    </Button>
                                )}
                            </Box>
                        </Box>

                        <Collapse in={filtersExpanded}>
                            <Box
                                sx={{
                                    mt: 2,
                                    pt: 2,
                                    borderTop: `1px solid ${theme.palette.divider}`,
                                }}
                            >
                                <ReproductionFilters
                                    dateRange={dateRange}
                                    setDateRange={setDateRange}
                                    estadoEvento={estadoEvento}
                                    setEstadoEvento={setEstadoEvento}
                                    tipoReproduccion={tipoReproduccion}
                                    setTipoReproduccion={setTipoReproduccion}
                                    resultado={resultado}
                                    setResultado={setResultado}
                                />
                            </Box>
                        </Collapse>
                    </Card>

                    {/* Results Information */}
                    {isFilterActive && (
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                mb: 2,
                            }}
                        >
                            <Typography variant="body2" color="text.secondary">
                                Mostrando {filteredEvents.length} de{" "}
                                {events.length} eventos
                            </Typography>
                        </Box>
                    )}

                    {/* Events List - Enhanced Table */}
                    <Box sx={{ mb: 4 }}>
                        <ReproductionEventsTable
                            data={filteredEvents}
                            onView={(ev) =>
                                router.push(`/reproduccion/ver/${ev.id}`)
                            }
                            onEdit={(ev) =>
                                router.push(`/reproduccion/editar/${ev.id}`)
                            }
                            onDelete={(id) => {
                                setEvents((prev) =>
                                    prev.filter((ev) => ev.id !== id)
                                );
                                toast.success("Evento eliminado");
                            }}
                        />
                    </Box>

                    {/* Empty state message */}
                    {filteredEvents.length === 0 && (
                        <Box
                            sx={{
                                textAlign: "center",
                                py: 6,
                                px: 2,
                                borderRadius: 3,
                                backgroundColor: alpha(
                                    theme.palette.background.paper,
                                    0.5
                                ),
                                border: `1px dashed ${theme.palette.divider}`,
                                mb: 4,
                            }}
                        >
                            <Typography
                                variant="h6"
                                color="text.secondary"
                                gutterBottom
                            >
                                No se encontraron eventos
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {isFilterActive
                                    ? "Intenta ajustar tus criterios de búsqueda o filtros"
                                    : "Registra tu primer evento de reproducción para comenzar"}
                            </Typography>
                            {isFilterActive ? (
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={clearFilters}
                                    sx={{ mt: 2, borderRadius: 2 }}
                                >
                                    Limpiar filtros
                                </Button>
                            ) : (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<Plus size={18} />}
                                    onClick={() =>
                                        router.push("/reproduccion/registrar")
                                    }
                                    sx={{
                                        mt: 2,
                                        borderRadius: 2,
                                        boxShadow: "none",
                                    }}
                                >
                                    Registrar evento
                                </Button>
                            )}
                        </Box>
                    )}

                    {/* Charts with title */}
                    {filteredEvents.length > 0 && (
                        <Box sx={{ mt: 4, mb: 4 }}>
                            <Typography
                                variant="h5"
                                sx={{
                                    mb: 3,
                                    fontWeight: "bold",
                                    color: theme.palette.primary.main,
                                }}
                            >
                                Análisis de eventos
                            </Typography>
                            <ReproductionCharts events={filteredEvents} />
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    );
}
