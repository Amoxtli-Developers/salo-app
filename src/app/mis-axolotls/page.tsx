"use client";

import React, { useEffect, useRef, useState } from "react";
import {
    Box,
    Typography,
    Button,
    Stack,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Card,
    alpha,
    Chip,
    Collapse,
    Grid,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Sidebar from "@/components/Layout/Sidebar";
import Navbar from "@/components/Layout/Navbar";
import GlobalSearch from "@/components/Axolotls/GlobalSearch";
import FilterPanel from "@/components/Axolotls/FilterPanel";
import AxolotlTable, { Axolotl } from "@/components/Axolotls/AxolotlTable";
import StatCard from "@/components/Layout/StatCard";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { clearNotification } from "@/features/authSlice";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import {
    Plus,
    FileText,
    ChevronDown,
    ChevronUp,
    ChartSpline,
    VenusAndMars,
    Calendar,
    AlertCircle,
} from "lucide-react";

export default function MyAxolotls() {
    const theme = useTheme();
    const dispatch = useDispatch();
    const notification = useSelector(
        (state: RootState) => state.auth.notification
    );
    const toastDisplayed = useRef(false);
    const router = useRouter();
    const [filtersExpanded, setFiltersExpanded] = useState(false);

    // Show a success toast if there's a notification
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

    // Estados para filtros
    const [globalSearch, setGlobalSearch] = useState("");
    const [filterSexo, setFilterSexo] = useState("");
    const [filterEstado, setFilterEstado] = useState("");
    const [filterFechaRegistro, setFilterFechaRegistro] = useState<
        [Date | null, Date | null]
    >([null, null]);
    const [filterEdad, setFilterEdad] = useState("");

    // Datos dummy para la tabla
    const [axolotls, setAxolotls] = useState<Axolotl[]>([
        {
            id: 1,
            code: "AX001",
            name: "Ajolote #001",
            sexo: "Masculino",
            registro: "2023-01-15",
            edad: "2 años",
            estado: "Bueno",
            ultimaRevision: "2023-06-10",
        },
        {
            id: 2,
            code: "AX002",
            name: "Ajolote #002",
            sexo: "Femenino",
            registro: "2023-02-10",
            edad: "1 año",
            estado: "Regular",
            ultimaRevision: "2023-06-12",
        },
        {
            id: 3,
            code: "AX003",
            name: "Ajolote #003",
            sexo: "Masculino",
            registro: "2023-03-05",
            edad: "6 meses",
            estado: "Crítico",
            ultimaRevision: "2023-06-15",
        },
        // ... otros registros
    ]);

    // Dialog state for deletion confirmation
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [axolotlToDeleteId, setAxolotlToDeleteId] = useState<number | null>(
        null
    );

    // Handlers to show/hide the deletion dialog
    const handleOpenDeleteDialog = (id: number) => {
        setAxolotlToDeleteId(id);
        setDeleteDialogOpen(true);
    };

    const handleCloseDeleteDialog = () => {
        setDeleteDialogOpen(false);
        setAxolotlToDeleteId(null);
    };

    const handleConfirmDelete = () => {
        if (axolotlToDeleteId !== null) {
            setAxolotls((prev) =>
                prev.filter((ax) => ax.id !== axolotlToDeleteId)
            );
            toast.success("Registro eliminado");
        }
        handleCloseDeleteDialog();
    };

    const handleEdit = (ax: Axolotl) => {
        // Navigate to the edit page for the given axolotl
        router.push(`/mis-axolotls/editar-axolotl/${ax.id}`);
    };

    const handleDelete = (id: number) => {
        // Instead of confirm(...), open a custom dialog
        handleOpenDeleteDialog(id);
    };

    // Toggle filters visibility
    const toggleFilters = () => {
        setFiltersExpanded(!filtersExpanded);
    };

    // Check if any filters are active
    const isFilterActive =
        filterSexo !== "" ||
        filterEstado !== "" ||
        filterFechaRegistro[0] !== null ||
        filterFechaRegistro[1] !== null ||
        filterEdad !== "";

    // Filtrado de axolotls
    const filteredAxolotls = axolotls.filter((ax) => {
        const searchLower = globalSearch.toLowerCase();
        if (
            searchLower &&
            !(
                ax.code.toLowerCase().includes(searchLower) ||
                ax.name.toLowerCase().includes(searchLower)
            )
        )
            return false;
        if (filterSexo && ax.sexo !== filterSexo) return false;
        if (filterEstado && ax.estado !== filterEstado) return false;
        if (
            filterFechaRegistro[0] &&
            new Date(ax.registro) < filterFechaRegistro[0]
        )
            return false;
        if (
            filterFechaRegistro[1] &&
            new Date(ax.registro) > filterFechaRegistro[1]
        )
            return false;
        if (filterEdad && ax.edad !== filterEdad) return false;
        return true;
    });

    const criticalAxolotlsCount = axolotls.filter(
        (ax) => ax.estado === "Crítico"
    ).length;

    const maleAxolotlsCount = axolotls.filter(
        (ax) => ax.sexo === "Masculino"
    ).length;

    const femaleAxolotlsCount = axolotls.filter(
        (ax) => ax.sexo === "Femenino"
    ).length;

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const getLatestRevisionDate = () => {
        if (axolotls.length === 0) return { date: "N/A", days: "N/A" };

        const dates = axolotls.map((ax) => new Date(ax.ultimaRevision));
        const latestDate = new Date(
            Math.max(...dates.map((date) => date.getTime()))
        );

        // Format date as DD/MM/YYYY
        const formattedDate = latestDate.toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });

        // Calculate days ago
        const today = new Date();
        const diffTime = Math.abs(today.getTime() - latestDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return {
            date: formattedDate,
            days: `Hace ${diffDays} ${diffDays === 1 ? "día" : "días"}`,
        };
    };

    const latestRevision = getLatestRevisionDate();

    // Define stat cards data
    const statCardsData = [
        {
            icon: <ChartSpline size={24} color={theme.palette.primary.main} />,
            title: "Total de Axolotls",
            value: axolotls.length.toString(),
        },
        {
            icon: <AlertCircle size={24} color={theme.palette.primary.main} />,
            title: "Estado Crítico",
            value: criticalAxolotlsCount.toString(),
        },
        {
            icon: <VenusAndMars size={24} color={theme.palette.primary.main} />,
            title: "Distribución por Sexo",
            value: `${maleAxolotlsCount}M / ${femaleAxolotlsCount}F`,
        },
        {
            icon: <Calendar size={24} color={theme.palette.primary.main} />,
            title: "Última Revisión",
            value: latestRevision.date,
        },
    ];

    return (
        <Box sx={{ display: "flex" }}>
            <Sidebar />
            <Box sx={{ flexGrow: 1 }}>
                <Navbar />
                <Box sx={{ p: 3 }}>
                    {/* Header Section with Title */}
                    <Typography
                        variant="h4"
                        sx={{
                            mb: 4,
                            color: theme.palette.primary.main,
                            fontWeight: "bold",
                        }}
                    >
                        Mis Axolotls
                    </Typography>

                    <Grid container spacing={3} sx={{ mb: 6 }}>
                        {statCardsData.map((card, index) => (
                            <Grid item xs={12} sm={6} md={3} key={index}>
                                <StatCard
                                    icon={card.icon}
                                    title={card.title}
                                    value={card.value}
                                />
                            </Grid>
                        ))}
                    </Grid>

                    <Box
                        sx={{
                            mb: 3,
                        }}
                    >
                        <Stack
                            direction={{ xs: "column", md: "row" }}
                            spacing={2}
                            sx={{
                                justifyContent: "space-between",
                                alignItems: { xs: "stretch", md: "center" },
                            }}
                        >
                            <GlobalSearch
                                search={globalSearch}
                                setSearch={setGlobalSearch}
                            />

                            <Box
                                display="flex"
                                gap={2}
                                flexDirection={{ xs: "column", sm: "row" }}
                            >
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() =>
                                        router.push(
                                            "/mis-axolotls/registrar-axolotl"
                                        )
                                    }
                                    startIcon={<Plus size={18} />}
                                    sx={{
                                        px: 3,
                                        borderRadius: 2,
                                        boxShadow: "none",
                                    }}
                                >
                                    Registrar Nuevo Axolotl
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
                                    Exportar
                                </Button>
                            </Box>
                        </Stack>

                        <Box mt={2}>
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
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                Filtros avanzados
                                {isFilterActive && (
                                    <Chip
                                        label="Activo"
                                        size="small"
                                        color="primary"
                                        sx={{ ml: 1, height: "22px" }}
                                    />
                                )}
                            </Button>
                        </Box>

                        <Collapse in={filtersExpanded}>
                            <Box
                                sx={{
                                    mt: 2,
                                    pt: 2,
                                    borderTop: `1px solid ${theme.palette.divider}`,
                                }}
                            >
                                <FilterPanel
                                    sexo={filterSexo}
                                    setSexo={setFilterSexo}
                                    estado={filterEstado}
                                    setEstado={setFilterEstado}
                                    fechaRegistro={filterFechaRegistro}
                                    setFechaRegistro={setFilterFechaRegistro}
                                    edad={filterEdad}
                                    setEdad={setFilterEdad}
                                />
                            </Box>
                        </Collapse>
                    </Box>

                    {/* Results Information */}
                    {isFilterActive && (
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                mb: 4,
                            }}
                        >
                            <Typography variant="body2" color="text.secondary">
                                Mostrando {filteredAxolotls.length} de{" "}
                                {axolotls.length} axolotls
                            </Typography>

                            <Button
                                size="small"
                                onClick={() => {
                                    setFilterSexo("");
                                    setFilterEstado("");
                                    setFilterFechaRegistro([null, null]);
                                    setFilterEdad("");
                                }}
                                sx={{
                                    textTransform: "none",
                                    fontWeight: "medium",
                                }}
                            >
                                Limpiar filtros
                            </Button>
                        </Box>
                    )}

                    {/* Tabla de Axolotls */}
                    <AxolotlTable
                        data={filteredAxolotls}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />

                    {/* Empty state message */}
                    {filteredAxolotls.length === 0 && (
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
                                mt: 3,
                            }}
                        >
                            <Typography
                                variant="h6"
                                color="text.secondary"
                                gutterBottom
                            >
                                No se encontraron axolotls
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {globalSearch || isFilterActive
                                    ? "Intenta ajustar tus criterios de búsqueda o filtros"
                                    : "Registra tu primer axolotl para comenzar"}
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Box>

            {/* Dialogo de confirmación para eliminar */}
            <Dialog
                open={deleteDialogOpen}
                onClose={handleCloseDeleteDialog}
                PaperProps={{
                    sx: {
                        borderRadius: 3,
                        p: 1,
                    },
                }}
            >
                <DialogTitle
                    sx={{
                        fontWeight: "bold",
                        color: theme.palette.error.main,
                    }}
                >
                    Confirmar Eliminación
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ¿Estás seguro de que deseas eliminar este registro? Esta
                        acción es irreversible.
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ p: 2, pt: 0 }}>
                    <Button
                        onClick={handleCloseDeleteDialog}
                        variant="outlined"
                        sx={{ borderRadius: 2 }}
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={handleConfirmDelete}
                        variant="contained"
                        color="error"
                        sx={{ borderRadius: 2, boxShadow: "none" }}
                    >
                        Eliminar
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
