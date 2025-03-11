"use client";

import React, { useEffect, useRef, useState } from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Sidebar from "@/components/Layout/Sidebar";
import Navbar from "@/components/Layout/Navbar";
import GlobalSearch from "@/components/Axolotls/GlobalSearch";
import FilterPanel from "@/components/Axolotls/FilterPanel";
import AxolotlTable, { Axolotl } from "@/components/Axolotls/AxolotlTable";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { clearNotification } from "@/features/authSlice";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function MyAxolotls() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const notification = useSelector((state: RootState) => state.auth.notification);
  const toastDisplayed = useRef(false);
  const router = useRouter();

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

  // Estados para filtros global y específicos
  const [globalSearch, setGlobalSearch] = useState("");
  const [filterSexo, setFilterSexo] = useState("");
  const [filterEstado, setFilterEstado] = useState("");
  const [filterFechaRegistro, setFilterFechaRegistro] = useState<[Date | null, Date | null]>([null, null]);
  const [filterEdad, setFilterEdad] = useState("");

  // Datos dummy para la tabla de axolotls
  const [axolotls, setAxolotls] = useState<Axolotl[]>([
    { id: 1, code: "AX001", name: "Ajolote #001", sexo: "Masculino", registro: "2023-01-15", edad: "2 años", estado: "Bueno", ultimaRevision: "2023-06-10" },
    { id: 2, code: "AX002", name: "Ajolote #002", sexo: "Femenino", registro: "2023-02-10", edad: "1 año", estado: "Regular", ultimaRevision: "2023-06-12" },
    { id: 3, code: "AX003", name: "Ajolote #003", sexo: "Masculino", registro: "2023-03-05", edad: "6 meses", estado: "Crítico", ultimaRevision: "2023-06-15" },
    // ... otros registros
  ]);

  // Funciones para accionables de la tabla
  const handleView = (ax: Axolotl) => {
    toast.info(`Ver detalles de ${ax.name}`);
    // Implementa la navegación o modal de detalle
  };

  const handleEdit = (ax: Axolotl) => {
    toast.info(`Editar ${ax.name}`);
    // Implementa la edición
  };

  const handleDelete = (id: number) => {
    if (confirm("¿Seguro que deseas eliminar este registro?")) {
      setAxolotls((prev) => prev.filter((ax) => ax.id !== id));
      toast.success("Registro eliminado");
    }
  };

  // Filtrado de axolotls (simplificado)
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
            <Button 
              variant="contained" 
              color="primary" 
              onClick={() => router.push("/mis-axolotls/registrar-axolotl")}
              sx={{ alignSelf: "flex-end" }}
            >
              Registrar Nuevo Axolote
            </Button>
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
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </Box>
      </Box>
    </Box>
  );
}
