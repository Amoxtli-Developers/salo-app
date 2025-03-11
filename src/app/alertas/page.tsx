"use client";

import React, { useState } from "react";
import { Box, Typography, Button, Grid, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Sidebar from "@/components/Layout/Sidebar";
import Navbar from "@/components/Layout/Navbar";
import KPICards from "@/components/AlertsAndNotifications/KPICards";
import GlobalFilters from "@/components/AlertsAndNotifications/GlobalFilters";
import AlertCard, {
  AlertData,
} from "@/components/AlertsAndNotifications/AlertCard";
import { toast } from "react-toastify";
import CreateAlertDialog from "@/components/AlertsAndNotifications/CreateAlertDialog";
import EditAlertDialog from "@/components/AlertsAndNotifications/EditAlertDialog";

export default function AlertsAndNotifications() {
  const theme = useTheme();

  // Dummy data for KPIs
  const kpiData = {
    totalActive: 50,
    pending: 30,
    attended: 15,
    critical: 5,
  };

  // Global filters state
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [prioridad, setPrioridad] = useState("");
  const [alertType, setAlertType] = useState("");
  const [alertStatus, setAlertStatus] = useState("");

  // Dummy alerts data
  const [alerts, setAlerts] = useState<AlertData[]>([
    {
      id: 1,
      tipo: "Vacunación",
      icon: "vaccination",
      prioridad: "Alta",
      descripcion: "Vacunación programada para el ajolote AX001.",
      fechaHora: "2023-07-20 10:00",
      estado: "Pendiente",
    },
    {
      id: 2,
      tipo: "Revisión",
      icon: "review",
      prioridad: "Media",
      descripcion: "Revisión general para el ajolote AX002.",
      fechaHora: "2023-07-21 14:30",
      estado: "Atendida",
    },
    {
      id: 3,
      tipo: "Tratamiento",
      icon: "treatment",
      prioridad: "Baja",
      descripcion: "Tratamiento para el ajolote AX003.",
      fechaHora: "2023-07-22 09:00",
      estado: "Pendiente",
    },
    // ... more alerts
  ]);

  // Dialog open states
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [currentAlert, setCurrentAlert] = useState<AlertData | null>(null);

  // Handlers for global actions
  const handleCreateAlert = () => {
    setOpenCreateDialog(true);
  };

  const handleExportAlerts = () => {
    toast.info("Exportando listado de alertas...");
    // Implement export logic here (CSV/Excel)
  };

  // Filter alerts based on global filters
  const filteredAlerts = alerts.filter((alert) => {
    return (
      (!alertType || alert.tipo === alertType) &&
      (!alertStatus || alert.estado === alertStatus) &&
      (!prioridad || alert.prioridad === prioridad)
    );
  });

  // Callback to add new alert from the dialog
  const handleAddAlert = (newAlert: AlertData) => {
    setAlerts((prev) => [...prev, newAlert]);
    toast.success(`Alerta de tipo "${newAlert.tipo}" creada.`);
  };

  // Handler to update an existing alert
  const handleUpdateAlert = (updatedAlert: AlertData) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === updatedAlert.id ? updatedAlert : a))
    );
    toast.success(`Alerta ${updatedAlert.id} actualizada.`);
  };

  // Handler for editing alert from AlertCard
  const handleEdit = (alert: AlertData) => {
    setCurrentAlert(alert);
    setOpenEditDialog(true);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1 }}>
        <Navbar />
        <Box sx={{ p: 3 }}>
          {/* Header and KPIs */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 3 }}
          >
            <Box>
              <Typography
                variant="h4"
                sx={{ color: theme.palette.primary.main, fontWeight: "bold" }}
              >
                Alertas y Notificaciones
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Revisa las alertas de próximas vacunaciones, revisiones y otros
                eventos críticos.
              </Typography>
            </Box>
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleCreateAlert}
              >
                Crear Nueva Alerta
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleExportAlerts}
              >
                Exportar Listado
              </Button>
            </Stack>
          </Stack>

          {/* Global Filters */}
          <Box sx={{ mt: 3, mb: 3 }}>
            <GlobalFilters
              dateRange={dateRange}
              setDateRange={setDateRange}
              prioridad={prioridad}
              setPrioridad={setPrioridad}
              alertType={alertType}
              setAlertType={setAlertType}
              alertStatus={alertStatus}
              setAlertStatus={setAlertStatus}
            />
          </Box>

          {/* KPIs */}
          <KPICards data={kpiData} />

          {/* Alerts List */}
          <Grid container spacing={2}>
            {filteredAlerts.map((alert) => (
              <Grid item xs={12} sm={6} md={4} key={alert.id}>
                <AlertCard
                  data={alert}
                  onMarkChange={(newState) => {
                    setAlerts((prev) =>
                      prev.map((a) =>
                        a.id === alert.id ? { ...a, estado: newState } : a
                      )
                    );
                    toast.success(`Alerta marcada como ${newState}`);
                  }}
                  onEdit={() => handleEdit(alert)}
                  onDelete={() => {
                    setAlerts((prev) => prev.filter((a) => a.id !== alert.id));
                    toast.success("Alerta eliminada");
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* Create Alert Dialog */}
      <CreateAlertDialog
        open={openCreateDialog}
        onClose={() => setOpenCreateDialog(false)}
        onCreate={handleAddAlert}
      />

      {/* Edit Alert Dialog */}
      {currentAlert && (
        <EditAlertDialog
          open={openEditDialog}
          onClose={() => setOpenEditDialog(false)}
          alertData={currentAlert} 
          onUpdate={handleUpdateAlert}
        />
      )}
    </Box>
  );
}
