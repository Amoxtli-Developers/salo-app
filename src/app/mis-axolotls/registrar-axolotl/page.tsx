"use client";

import React, { useState } from "react";
import { Box, Typography, Paper, Button, Stack, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import BasicInfoForm, { BasicInfoData } from "@/components/AxolotlsRegistration/BasicInfoForm";
import HealthStatusForm, { HealthStatusData } from "@/components/AxolotlsRegistration/HealthStatusForm";
import AdditionalInfoForm, { AdditionalInfoData } from "@/components/AxolotlsRegistration/AdditionalInfoForm";

import Sidebar from "@/components/Layout/Sidebar";
import Navbar from "@/components/Layout/Navbar";

export interface NewAxolotlFormData {
  basicInfo: BasicInfoData;
  healthStatus: HealthStatusData;
  additionalInfo: AdditionalInfoData;
}

export default function NewAxolotl() {
  const theme = useTheme();
  const router = useRouter();

  // Global form state
  const [formData, setFormData] = useState<NewAxolotlFormData>({
    basicInfo: {
      code: "",
      name: "",
      birthDate: null,
      sexo: "",
      registerDate: new Date(),
    },
    healthStatus: {
      estadoSalud: "",
      notasSalud: "",
    },
    additionalInfo: {
      observaciones: "",
    },
  });

  // Computed property to determine if all required fields are filled
  const isFormComplete = Boolean(
    formData.basicInfo.name.trim() &&
      formData.basicInfo.birthDate &&
      formData.basicInfo.sexo &&
      formData.healthStatus.estadoSalud
  );

  // Handlers for each form section
  const handleBasicInfoChange = (updatedData: BasicInfoData) => {
    setFormData((prev) => ({ ...prev, basicInfo: updatedData }));
  };

  const handleHealthStatusChange = (updatedData: HealthStatusData) => {
    setFormData((prev) => ({ ...prev, healthStatus: updatedData }));
  };

  const handleAdditionalInfoChange = (updatedData: AdditionalInfoData) => {
    setFormData((prev) => ({ ...prev, additionalInfo: updatedData }));
  };

  // Validation with Toastify
  const validateForm = (): boolean => {
    const { basicInfo, healthStatus } = formData;

    if (!basicInfo.name.trim()) {
      toast.error("El campo 'Nombre o Etiqueta' es obligatorio.");
      return false;
    }
    if (!basicInfo.birthDate) {
      toast.error("La 'Fecha de Nacimiento' es obligatoria.");
      return false;
    }
    if (!basicInfo.sexo) {
      toast.error("El campo 'Sexo' es obligatorio.");
      return false;
    }
    if (!healthStatus.estadoSalud) {
      toast.error("El 'Estado de Salud' es obligatorio.");
      return false;
    }
    return true;
  };

  // Submit handler
  const handleSubmit = () => {
    if (!validateForm()) return;
    // If valid, simulate successful registration
    toast.success("¡Ajolote registrado con éxito!");
    router.push("/mis-axolotls");
  };

  // Cancel handler
  const handleCancel = () => {
    router.back();
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1 }}>
        <Navbar />
        <Box sx={{ p: 3 }}>
          {/* Header: Title and action buttons on the same row */}
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
            <Typography variant="h4" sx={{ color: theme.palette.primary.main, fontWeight: "bold" }}>
              Registrar Nuevo Ajolote
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button variant="outlined" color="inherit" onClick={handleCancel}>
                Cancelar
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={!isFormComplete}
              >
                Registrar
              </Button>
            </Stack>
          </Box>

          <Typography variant="body2" sx={{ mb: 3 }}>
            Completa el siguiente formulario. Los campos marcados con * son obligatorios.
          </Typography>

          {/* Two-Column Grid for the forms */}
          <Grid container spacing={3}>
            {/* Left Column: Basic Information */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }} elevation={3}>
                <BasicInfoForm
                  data={formData.basicInfo}
                  onChange={handleBasicInfoChange}
                />
              </Paper>
            </Grid>
            {/* Right Column: Health Status and Additional Information */}
            <Grid item xs={12} md={6}>
              <Stack>
                <Paper sx={{ p: 3 }} elevation={3}>
                  <HealthStatusForm
                    data={formData.healthStatus}
                    onChange={handleHealthStatusChange}
                  />
                </Paper>
                <Paper sx={{ p: 3 }} elevation={3}>
                  <AdditionalInfoForm
                    data={formData.additionalInfo}
                    onChange={handleAdditionalInfoChange}
                  />
                </Paper>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
