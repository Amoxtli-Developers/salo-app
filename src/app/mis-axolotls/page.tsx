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
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Sidebar from "@/components/Layout/Sidebar";
import Navbar from "@/components/Layout/Navbar";
import GlobalSearch from "@/components/Axolotls/GlobalSearch";
import FilterPanel from "@/components/Axolotls/FilterPanel";
import AxolotlTable, { Axolotl } from "@/components/Axolotls/AxolotlTable";

import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function MyAxolotls() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const toastDisplayed = useRef(false);
  const router = useRouter();

  // Estados para filtros
  const [globalSearch, setGlobalSearch] = useState("");
  const [filterSexo, setFilterSexo] = useState("");
  const [filterEstado, setFilterEstado] = useState("");
  const [filterFechaRegistro, setFilterFechaRegistro] = useState<[Date | null, Date | null]>([null, null]);
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
  const [axolotlToDeleteId, setAxolotlToDeleteId] = useState<number | null>(null);

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
      setAxolotls((prev) => prev.filter((ax) => ax.id !== axolotlToDeleteId));
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

  // Filtrado de axolotls
  const filteredAxolotls = axolotls.filter((ax) => {
    const searchLower = globalSearch.toLowerCase();
    if (searchLower && !(ax.code.toLowerCase().includes(searchLower) || ax.name.toLowerCase().includes(searchLower)))
      return false;
    if (filterSexo && ax.sexo !== filterSexo) return false;
    if (filterEstado && ax.estado !== filterEstado) return false;
    if (filterFechaRegistro[0] && new Date(ax.registro) < filterFechaRegistro[0]) return false;
    if (filterFechaRegistro[1] && new Date(ax.registro) > filterFechaRegistro[1]) return false;
    if (filterEdad && ax.edad !== filterEdad) return false;
    return true;
  });

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1 }}>
        <Navbar />
        <Box sx={{ p: 2 }}>
          <Typography variant="h4" sx={{ mb: 4, color: theme.palette.primary.main, fontWeight: "bold" }}>
            Mis Axolotls
          </Typography>
          {/* Fila superior: Barra de búsqueda y botón registrar alineados a la derecha */}
          <Stack direction="row" spacing={2} sx={{ mb: 4, justifyContent: "space-between" }}>
            <GlobalSearch search={globalSearch} setSearch={setGlobalSearch} />
            <Box display="flex" justifyContent="flex-end" gap={2}>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={() => router.push("/mis-axolotls/registrar-axolotl")}
              >
                Registrar Nuevo Axolotl
              </Button>
              <Button variant="outlined" color="primary">
                Exportar mis Axolotls
              </Button>
            </Box>
          </Stack>
          {/* Panel de filtros específicos */}
          <Box sx={{ mb: 4 }}>
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
          {/* Tabla de Axolotls */}
          <AxolotlTable
            data={filteredAxolotls}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </Box>
      </Box>

      {/* Dialogo de confirmación para eliminar */}
      <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas eliminar este registro? Esta acción es irreversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} variant="outlined">
            Cancelar
          </Button>
          <Button onClick={handleConfirmDelete} variant="contained">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
