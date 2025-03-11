"use client";

import React, { useState } from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Layout/Sidebar";
import Navbar from "@/components/Layout/Navbar";
import ReproductionFilters from "@/components/Reproduction/ReproductionFilters";
import ReproductionKPICards from "@/components/Reproduction/ReproductionKPICards";
import ReproductionEventsTable, { ReproduccionEvent } from "@/components/Reproduction/ReproductionEventsTable";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";

const ReproductionCharts = dynamic(
  () => import("@/components/Reproduction/ReproductionCharts"),
  { ssr: false }
);

export default function ReproduccionPage() {
  const theme = useTheme();
  const router = useRouter();

  // Dummy data for KPI cards
  const kpiData = {
    totalEvents: 20,
    newPairs: 5,
    eventsInProgress: 3,
    successRate: 75, // percentage
  };

  // Global filters state
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [estadoEvento, setEstadoEvento] = useState(""); // e.g. "Programado", "En Proceso", "Finalizado", "Cancelado"
  const [tipoReproduccion, setTipoReproduccion] = useState(""); // e.g. "Natural", "Intervención Controlada"
  const [resultado, setResultado] = useState(""); // e.g. "Sin Resultado", "Exitoso", "Fallido"

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
    if (
      dateRange[0] &&
      new Date(ev.fechaProgramada) < dateRange[0]
    )
      return false;
    if (
      dateRange[1] &&
      new Date(ev.fechaProgramada) > dateRange[1]
    )
      return false;
    if (estadoEvento && ev.estado !== estadoEvento) return false;
    if (tipoReproduccion && !ev.progenitores.includes(tipoReproduccion)) return false;
    if (resultado && ev.resultado !== resultado) return false;
    return true;
  });

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, bgcolor: "background.default", minHeight: "100vh" }}>
        <Navbar />
        <Box sx={{ p: { xs: 2, md: 4 } }}>
          {/* Header */}
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" sx={{ fontWeight: "bold", color: theme.palette.primary.main }}>
                Control de Reproducción
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Gestiona y monitorea los eventos reproductivos de tus ajolotes. Consulta el historial de parejas, eventos programados y resultados, y toma decisiones basadas en datos actualizados.
              </Typography>
            </Box>
            <Stack direction="row" spacing={2}>
              <Button variant="contained" color="primary" onClick={() => router.push("/reproduccion/registrar")}>
                Nuevo Evento
              </Button>
              <Button variant="outlined" color="primary">
                Exportar Datos
              </Button>
            </Stack>
          </Stack>

          {/* Global Filters */}
          <Box sx={{ mb: 3 }}>
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

          {/* KPI Cards */}
          <Box sx={{ mb: 3 }}>
            <ReproductionKPICards data={kpiData} />
          </Box>

          {/* Charts */}
          <Box sx={{ mb: 4 }}>
            <ReproductionCharts events={filteredEvents} />
          </Box>

          {/* Events List */}
          <ReproductionEventsTable
            data={filteredEvents}
            onView={(ev) => toast.info(`Ver detalles del evento ${ev.id}`)}
            onEdit={(ev) => router.push(`/reproduccion/editar/${ev.id}`)}
            onDelete={(id) => {
              setEvents((prev) => prev.filter((ev) => ev.id !== id));
              toast.success("Evento eliminado");
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
