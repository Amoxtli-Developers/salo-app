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
    Chip,
    Box,
    Typography,
    Tooltip,
    alpha,
    useTheme,
} from "@mui/material";

import {
    Pencil,
    Trash2,
    CheckCircle,
    AlertTriangle,
    AlertCircle,
    Mars,
    Venus,
} from "lucide-react";

export interface Axolotl {
    id: number;
    code: string;
    name: string;
    sexo: "Masculino" | "Femenino";
    registro: string;
    edad: string;
    estado: "Bueno" | "Regular" | "Crítico";
    ultimaRevision: string;
}

interface AxolotlTableProps {
    data: Axolotl[];
    onEdit: (ax: Axolotl) => void;
    onDelete: (id: number) => void;
}

const AxolotlTable: React.FC<AxolotlTableProps> = ({
    data,
    onEdit,
    onDelete,
}) => {
    const theme = useTheme();

    const getEstadoChip = (estado: string) => {
        switch (estado) {
            case "Bueno":
                return (
                    <Chip
                        label="Bueno"
                        icon={<CheckCircle size={16} />}
                        size="small"
                        sx={{
                            backgroundColor: alpha(
                                theme.palette.success.main,
                                0.1
                            ),
                            color: theme.palette.success.main,
                            fontWeight: 500,
                            "& .MuiChip-icon": {
                                color: theme.palette.success.main,
                            },
                            borderRadius: "8px",
                        }}
                    />
                );
            case "Regular":
                return (
                    <Chip
                        label="Regular"
                        icon={<AlertTriangle size={16} />}
                        size="small"
                        sx={{
                            backgroundColor: alpha(
                                theme.palette.warning.main,
                                0.1
                            ),
                            color: theme.palette.warning.main,
                            fontWeight: 500,
                            "& .MuiChip-icon": {
                                color: theme.palette.warning.main,
                            },
                            borderRadius: "8px",
                        }}
                    />
                );
            case "Crítico":
                return (
                    <Chip
                        label="Crítico"
                        icon={<AlertCircle size={16} />}
                        size="small"
                        sx={{
                            backgroundColor: alpha(
                                theme.palette.error.main,
                                0.1
                            ),
                            color: theme.palette.error.main,
                            fontWeight: 500,
                            "& .MuiChip-icon": {
                                color: theme.palette.error.main,
                            },
                            borderRadius: "8px",
                        }}
                    />
                );
            default:
                return (
                    <Chip
                        label={estado}
                        size="small"
                        sx={{
                            backgroundColor: alpha(
                                theme.palette.text.secondary,
                                0.1
                            ),
                            color: theme.palette.text.secondary,
                            fontWeight: 500,
                            borderRadius: "8px",
                        }}
                    />
                );
        }
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
                            ID / Código
                        </TableCell>
                        <TableCell sx={{ py: 2, fontWeight: "500" }}>
                            Nombre / Etiqueta
                        </TableCell>
                        <TableCell sx={{ py: 2, fontWeight: "500" }}>
                            Sexo
                        </TableCell>
                        <TableCell sx={{ py: 2, fontWeight: "500" }}>
                            Fecha de Registro
                        </TableCell>
                        <TableCell sx={{ py: 2, fontWeight: "500" }}>
                            Edad
                        </TableCell>
                        <TableCell sx={{ py: 2, fontWeight: "500" }}>
                            Estado de Salud
                        </TableCell>
                        <TableCell sx={{ py: 2, fontWeight: "500" }}>
                            Última Revisión
                        </TableCell>
                        <TableCell sx={{ py: 2, fontWeight: "500" }}>
                            Acciones
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((ax, index) => (
                        <TableRow
                            key={ax.id}
                            sx={{
                                "&:nth-of-type(odd)": {
                                    backgroundColor:
                                        theme.palette.mode === "dark"
                                            ? alpha(
                                                  theme.palette.action.hover,
                                                  0.05
                                              )
                                            : alpha(
                                                  theme.palette.action.hover,
                                                  0.02
                                              ),
                                },
                                "&:hover": {
                                    backgroundColor:
                                        theme.palette.mode === "dark"
                                            ? alpha(
                                                  theme.palette.action.hover,
                                                  0.1
                                              )
                                            : alpha(
                                                  theme.palette.action.hover,
                                                  0.05
                                              ),
                                },
                                transition: "background-color 0.2s ease",
                            }}
                        >
                            <TableCell>
                                <Typography
                                    variant="body2"
                                    fontWeight={300}
                                    fontSize={"12px"}
                                >
                                    {ax.code}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                    variant="body2"
                                    fontWeight={300}
                                    fontSize={"12px"}
                                >
                                    {ax.name}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                    variant="body2"
                                    fontWeight={300}
                                    fontSize={"12px"}
                                >
                                    {ax.sexo}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                    variant="body2"
                                    fontWeight={300}
                                    fontSize={"12px"}
                                >
                                    {ax.registro}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                    variant="body2"
                                    fontWeight={300}
                                    fontSize={"12px"}
                                >
                                    {ax.edad}
                                </Typography>
                            </TableCell>
                            <TableCell>{getEstadoChip(ax.estado)}</TableCell>
                            <TableCell>
                                <Typography
                                    variant="body2"
                                    fontWeight={300}
                                    fontSize={"12px"}
                                >
                                    {ax.ultimaRevision}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Box sx={{ display: "flex" }}>
                                    <Tooltip title="Editar">
                                        <IconButton
                                            size="small"
                                            onClick={() => onEdit(ax)}
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
                                            <Pencil size={18} />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Eliminar">
                                        <IconButton
                                            size="small"
                                            onClick={() => onDelete(ax.id)}
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
        </TableContainer>
    );
};

export default AxolotlTable;
