"use client";

import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Box,
    Typography,
    Tooltip,
    alpha,
    useTheme,
    Chip,
} from "@mui/material";
import {
    Eye,
    Edit,
    Trash2,
    Calendar,
    CheckCircle,
    Clock,
    XCircle,
} from "lucide-react";

export interface ReproduccionEvent {
    id: number;
    progenitores: string;
    fechaProgramada: string;
    estado: "Programado" | "En Proceso" | "Finalizado" | "Cancelado";
    resultado: string;
}

interface ReproduccionEventsTableProps {
    data: ReproduccionEvent[];
    onView: (ev: ReproduccionEvent) => void;
    onEdit: (ev: ReproduccionEvent) => void;
    onDelete: (id: number) => void;
}

const ReproduccionEventsTable: React.FC<ReproduccionEventsTableProps> = ({
    data,
    onView,
    onEdit,
    onDelete,
}) => {
    const theme = useTheme();

    // Function to render status with appropriate styling
    const renderEstadoChip = (estado: string) => {
        let color;
        let icon;

        switch (estado) {
            case "Programado":
                color = theme.palette.info.main;
                icon = <Calendar size={16} />;
                break;
            case "En Proceso":
                color = theme.palette.warning.main;
                icon = <Clock size={16} />;
                break;
            case "Finalizado":
                color = theme.palette.success.main;
                icon = <CheckCircle size={16} />;
                break;
            case "Cancelado":
                color = theme.palette.error.main;
                icon = <XCircle size={16} />;
                break;
            default:
                color = theme.palette.text.secondary;
                icon = <Calendar size={16} />;
        }

        return (
            <Chip
                label={estado}
                icon={icon}
                size="small"
                sx={{
                    backgroundColor: alpha(color, 0.1),
                    color: color,
                    fontWeight: 500,
                    "& .MuiChip-icon": {
                        color: color,
                    },
                    borderRadius: "8px",
                }}
            />
        );
    };

    // Format date for better display
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    return (
        <TableContainer
            component={Paper}
            sx={{
                boxShadow: "none",
                overflow: "hidden",
            }}
        >
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ py: 2, fontWeight: "500" }}>
                            ID
                        </TableCell>
                        <TableCell sx={{ py: 2, fontWeight: "500" }}>
                            Pareja / Progenitores
                        </TableCell>
                        <TableCell sx={{ py: 2, fontWeight: "500" }}>
                            Fecha Programada
                        </TableCell>
                        <TableCell sx={{ py: 2, fontWeight: "500" }}>
                            Estado
                        </TableCell>
                        <TableCell sx={{ py: 2, fontWeight: "500" }}>
                            Resultado
                        </TableCell>
                        <TableCell sx={{ py: 2, fontWeight: "500" }}>
                            Acciones
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((ev, index) => (
                        <TableRow key={ev.id}>
                            <TableCell>
                                <Typography
                                    variant="body2"
                                    fontWeight={300}
                                    fontSize={"12px"}
                                >
                                    {`R-${String(ev.id).padStart(4, "0")}`}
                                </Typography>
                            </TableCell>

                            <TableCell>
                                <Typography
                                    variant="body2"
                                    fontWeight={300}
                                    fontSize={"12px"}
                                >
                                    {ev.progenitores}
                                </Typography>
                            </TableCell>

                            <TableCell>
                                <Typography
                                    variant="body2"
                                    fontWeight={300}
                                    fontSize={"12px"}
                                >
                                    {formatDate(ev.fechaProgramada)}
                                </Typography>
                            </TableCell>

                            <TableCell>{renderEstadoChip(ev.estado)}</TableCell>

                            <TableCell>
                                <Typography
                                    variant="body2"
                                    fontWeight={300}
                                    fontSize={"12px"}
                                >
                                    {ev.resultado || "No disponible"}
                                </Typography>
                            </TableCell>

                            <TableCell>
                                <Box sx={{ display: "flex" }}>
                                    <Tooltip title="Ver Detalle">
                                        <IconButton
                                            size="small"
                                            onClick={() => onView(ev)}
                                            sx={{
                                                "&:hover": {
                                                    backgroundColor: alpha(
                                                        theme.palette.primary
                                                            .main,
                                                        0.1
                                                    ),
                                                },
                                            }}
                                        >
                                            <Eye size={18} />
                                        </IconButton>
                                    </Tooltip>

                                    <Tooltip title="Editar">
                                        <IconButton
                                            size="small"
                                            onClick={() => onEdit(ev)}
                                            sx={{
                                                "&:hover": {
                                                    backgroundColor: alpha(
                                                        theme.palette.primary
                                                            .main,
                                                        0.1
                                                    ),
                                                },
                                            }}
                                        >
                                            <Edit size={18} />
                                        </IconButton>
                                    </Tooltip>

                                    <Tooltip title="Eliminar">
                                        <IconButton
                                            size="small"
                                            onClick={() => onDelete(ev.id)}
                                            sx={{
                                                "&:hover": {
                                                    backgroundColor: alpha(
                                                        theme.palette.primary
                                                            .main,
                                                        0.1
                                                    ),
                                                },
                                            }}
                                        >
                                            <Trash2 size={18} />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Empty state */}
            {data.length === 0 && (
                <Box sx={{ p: 4, textAlign: "center" }}>
                    <Typography variant="body1" color="text.secondary">
                        No hay eventos de reproducción registrados
                    </Typography>
                </Box>
            )}
        </TableContainer>
    );
};

export default ReproduccionEventsTable;
