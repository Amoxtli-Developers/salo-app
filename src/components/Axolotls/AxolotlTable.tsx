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
  Menu,
  MenuItem,
  Chip,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

// Íconos de estado
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedId(null);
  };

  // Función para mapear el estado a un Chip con color suave e ícono
  const getEstadoChip = (estado: string) => {
    switch (estado) {
      case "Bueno":
        return (
          <Chip
            label="Bueno"
            icon={<CheckCircleOutlineIcon sx={{ fontSize: 16 }} />}
            size="small"
            sx={{
              backgroundColor: "#E8F5E9", // Verde claro
              color: "#388E3C",
              "& .MuiChip-icon": {
                color: "#388E3C",
              },
            }}
          />
        );
      case "Regular":
        return (
          <Chip
            label="Regular"
            icon={<WarningAmberIcon sx={{ fontSize: 16 }} />}
            size="small"
            sx={{
              backgroundColor: "#FFF8E1", // Amarillo claro
              color: "#F57C00",
              "& .MuiChip-icon": {
                color: "#F57C00",
              },
            }}
          />
        );
      case "Crítico":
        return (
          <Chip
            label="Crítico"
            icon={<ErrorOutlineIcon sx={{ fontSize: 16 }} />}
            size="small"
            sx={{
              backgroundColor: "#FFEBEE", // Rojo claro
              color: "#D32F2F",
              "& .MuiChip-icon": {
                color: "#D32F2F",
              },
            }}
          />
        );
      default:
        return (
          <Chip
            label={estado}
            size="small"
            sx={{
              backgroundColor: "#F5F5F5", // Gris claro
              color: "#616161",
            }}
          />
        );
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID / Código</TableCell>
            <TableCell>Nombre / Etiqueta</TableCell>
            <TableCell>Sexo</TableCell>
            <TableCell>Fecha de Registro</TableCell>
            <TableCell>Edad</TableCell>
            <TableCell>Estado de Salud</TableCell>
            <TableCell>Última Revisión</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((ax) => (
            <TableRow key={ax.id}>
              <TableCell>{ax.code}</TableCell>
              <TableCell>{ax.name}</TableCell>
              <TableCell>{ax.sexo}</TableCell>
              <TableCell>{ax.registro}</TableCell>
              <TableCell>{ax.edad}</TableCell>
              <TableCell>{getEstadoChip(ax.estado)}</TableCell>
              <TableCell>{ax.ultimaRevision}</TableCell>
              <TableCell>
                <IconButton onClick={(e) => handleMenuOpen(e, ax.id)}>
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl) && selectedId === ax.id}
                  onClose={handleMenuClose}
                >
                  <MenuItem
                    onClick={() => {
                      handleMenuClose();
                      onEdit(ax);
                    }}
                  >
                    Editar
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleMenuClose();
                      onDelete(ax.id);
                    }}
                  >
                    Eliminar
                  </MenuItem>
                </Menu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AxolotlTable;
