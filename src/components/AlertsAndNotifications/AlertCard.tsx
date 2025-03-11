"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Chip,
  Stack,
} from "@mui/material";
import { MoreVertical, CheckCircle, Edit2, Trash2, Undo2 } from "lucide-react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

export interface AlertData {
  id: number;
  tipo: string;
  icon: string; // Key for selecting an icon (not used in this example)
  prioridad: "Alta" | "Media" | "Baja";
  descripcion: string;
  fechaHora: string;
  estado: "Pendiente" | "Atendida";
}

interface AlertCardProps {
  data: AlertData;
  onMarkChange: (newState: "Pendiente" | "Atendida") => void;
  onEdit: () => void;
  onDelete: () => void;
}

const AlertCard: React.FC<AlertCardProps> = ({
  data,
  onMarkChange,
  onEdit,
  onDelete,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Priority chip with softer colors
  const getPriorityChip = () => {
    if (data.prioridad === "Alta")
      return (
        <Chip
          label="Alta"
          size="small"
          sx={{
            backgroundColor: "#FFCDD2", // Light red
            color: "#C62828",
          }}
        />
      );
    if (data.prioridad === "Media")
      return (
        <Chip
          label="Media"
          size="small"
          sx={{
            backgroundColor: "#FFF9C4", // Light yellow
            color: "#F9A825",
          }}
        />
      );
    if (data.prioridad === "Baja")
      return (
        <Chip
          label="Baja"
          size="small"
          sx={{
            backgroundColor: "#C8E6C9", // Light green
            color: "#2E7D32",
          }}
        />
      );
    return null;
  };

  // Status chip with corresponding icon and soft colors
  const getStatusChip = () => {
    if (data.estado === "Pendiente")
      return (
        <Chip
          label="Pendiente"
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
    if (data.estado === "Atendida")
      return (
        <Chip
          label="Atendida"
          size="small"
          icon={<CheckCircleOutlineIcon fontSize="small" />}
          sx={{
            backgroundColor: "#E8F5E9", // Verde claro
            color: "#388E3C",
            "& .MuiChip-icon": {
              color: "#388E3C",
            },
          }}
        />
      );
    return null;
  };

  return (
    <Card
      sx={{
        minHeight: 180,
        border: (theme: { palette: { divider: any } }) => // eslint-disable-line
          `1px solid ${theme.palette.divider}`,
        boxShadow: 0,
        backgroundColor: (theme: { palette: { background: { paper: any } } }) => // eslint-disable-line
          theme.palette.background.paper,
      }}
    >
      <CardContent>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h6">{data.tipo}</Typography>
          {getPriorityChip()}
        </Stack>
        <Typography variant="body2" sx={{ mt: 1 }}>
          {data.descripcion}
        </Typography>
        <Typography
          variant="caption"
          color="textSecondary"
          sx={{ mt: 1, display: "block" }}
        >
          {data.fechaHora}
        </Typography>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
          <Typography variant="body2">Estado:</Typography>
          {getStatusChip()}
        </Stack>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          onClick={() =>
            onMarkChange(data.estado === "Pendiente" ? "Atendida" : "Pendiente")
          }
        >
          {data.estado === "Pendiente" ? (
            <CheckCircle size={20} />
          ) : (
            <Undo2 size={20} />
          )}
        </IconButton>
        <IconButton onClick={onEdit}>
          <Edit2 size={20} />
        </IconButton>
        <IconButton onClick={onDelete}>
          <Trash2 size={20} />
        </IconButton>
        <IconButton onClick={handleMenuOpen} sx={{ marginLeft: "auto" }}>
          <MoreVertical size={20} />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem
            onClick={() => {
              handleMenuClose();
              onMarkChange(
                data.estado === "Pendiente" ? "Atendida" : "Pendiente"
              );
            }}
          >
            {data.estado === "Pendiente"
              ? "Marcar como Atendida"
              : "Marcar como Pendiente"}
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleMenuClose();
              onEdit();
            }}
          >
            Editar
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleMenuClose();
              onDelete();
            }}
          >
            Eliminar
          </MenuItem>
        </Menu>
      </CardActions>
    </Card>
  );
};

export default AlertCard;
