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
  Menu,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, id: number) => {
    setAnchorEl(event.currentTarget);
    setSelectedId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedId(null);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID del Evento</TableCell>
            <TableCell>Pareja / Progenitores</TableCell>
            <TableCell>Fecha Programada</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Resultado</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((ev) => (
            <TableRow key={ev.id}>
              <TableCell>{ev.id}</TableCell>
              <TableCell>{ev.progenitores}</TableCell>
              <TableCell>{ev.fechaProgramada}</TableCell>
              <TableCell>{ev.estado}</TableCell>
              <TableCell>{ev.resultado}</TableCell>
              <TableCell>
                <IconButton onClick={(e) => handleMenuOpen(e, ev.id)}>
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl) && selectedId === ev.id}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={() => { handleMenuClose(); onView(ev); }}>Ver Detalle</MenuItem>
                  <MenuItem onClick={() => { handleMenuClose(); onEdit(ev); }}>Editar</MenuItem>
                  <MenuItem onClick={() => { handleMenuClose(); onDelete(ev.id); }}>Eliminar</MenuItem>
                </Menu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ReproduccionEventsTable;
