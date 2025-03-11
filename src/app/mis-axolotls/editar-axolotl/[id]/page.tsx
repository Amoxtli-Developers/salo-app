"use client";

import React, { useState, useEffect } from "react";
import { Box, Typography, Paper, Button, Stack, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRouter, useParams } from "next/navigation";
import BasicInfoForm, { BasicInfoData } from "@/components/AxolotlsRegistration/BasicInfoForm";
import HealthStatusForm, { HealthStatusData } from "@/components/AxolotlsRegistration/HealthStatusForm";
import AdditionalInfoForm, { AdditionalInfoData } from "@/components/AxolotlsRegistration/AdditionalInfoForm";
import Sidebar from "@/components/Layout/Sidebar";
import Navbar from "@/components/Layout/Navbar";
import { toast } from "react-toastify";

export interface EditAxolotlFormData {
  basicInfo: BasicInfoData;
  healthStatus: HealthStatusData;
  additionalInfo: AdditionalInfoData;
}

export default function EditAxolotlPage() {
  const theme = useTheme();
  const router = useRouter();
  const params = useParams(); // Get the dynamic [id]
  const id = params.id ? params.id[0] : ""; // id is a string

  // Dummy mapping of data for different IDs
  const dummyData: { [key: string]: EditAxolotlFormData } = {
    "1": {
      basicInfo: {
        code: "AX001",
        name: "Ajolote #001",
        birthDate: new Date("2023-01-15"),
        sexo: "Masculino",
        registerDate: new Date("2023-01-15"),
      },
      healthStatus: {
        estadoSalud: "Bueno",
        notasSalud: "El ajolote se encuentra en óptimas condiciones.",
      },
      additionalInfo: {
        observaciones: "Ninguna observación adicional.",
      },
    },
    "2": {
      basicInfo: {
        code: "AX002",
        name: "Ajolote #002",
        birthDate: new Date("2023-02-10"),
        sexo: "Femenino",
        registerDate: new Date("2023-02-10"),
      },
      healthStatus: {
        estadoSalud: "Regular",
        notasSalud: "Requiere seguimiento para revisión.",
      },
      additionalInfo: {
        observaciones: "Observaciones para #002.",
      },
    },
    "3": {
      basicInfo: {
        code: "AX003",
        name: "Ajolote #003",
        birthDate: new Date("2023-03-05"),
        sexo: "Masculino",
        registerDate: new Date("2023-03-05"),
      },
      healthStatus: {
        estadoSalud: "Crítico",
        notasSalud: "Atención médica urgente requerida.",
      },
      additionalInfo: {
        observaciones: "Observaciones para #003.",
      },
    },
  };

  // Global form state
  const [formData, setFormData] = useState<EditAxolotlFormData>(dummyData["1"]);

  // When id changes, update formData
  useEffect(() => {
    if (id && dummyData[id]) {
      setFormData(dummyData[id]);
    } else {
      // If id not found, you might choose to redirect or set to default.
      setFormData(dummyData["1"]);
    }
  }, [id]); // eslint-disable-line

  // Handlers for each section of the form
  const handleBasicInfoChange = (updatedData: BasicInfoData) => {
    setFormData((prev) => ({ ...prev, basicInfo: updatedData }));
  };

  const handleHealthStatusChange = (updatedData: HealthStatusData) => {
    setFormData((prev) => ({ ...prev, healthStatus: updatedData }));
  };

  const handleAdditionalInfoChange = (updatedData: AdditionalInfoData) => {
    setFormData((prev) => ({ ...prev, additionalInfo: updatedData }));
  };

  // Validate required fields (simple validation)
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

  // Submit handler for updating the axolotl
  const handleSubmit = () => {
    if (!validateForm()) return;
    // Simulate update logic (in a real app, send updated data to backend)
    toast.success("¡Ajolote actualizado con éxito!");
    router.push("/mis-axolotls");
  };

  // Cancel handler to go back to the list
  const handleCancel = () => {
    router.push("/mis-axolotls");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1 }}>
        <Navbar />
        <Box sx={{ p: 3 }}>
          {/* Header: Title and action buttons */}
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
            <Typography variant="h4" sx={{ color: theme.palette.primary.main, fontWeight: "bold" }}>
              Editar Ajolote
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button variant="outlined" color="inherit" onClick={handleCancel}>
                Cancelar
              </Button>
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                Actualizar
              </Button>
            </Stack>
          </Stack>
          <Typography variant="body2" sx={{ mb: 3 }}>
            Completa el siguiente formulario. Los campos marcados con * son obligatorios.
          </Typography>

          {/* Two-column Grid for the form sections */}
          <Grid container spacing={3}>
            {/* Left Column: Basic Information */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }} elevation={3}>
                <BasicInfoForm data={formData.basicInfo} onChange={handleBasicInfoChange} />
              </Paper>
            </Grid>
            {/* Right Column: Health Status and Additional Information */}
            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                <Paper sx={{ p: 3 }} elevation={3}>
                  <HealthStatusForm data={formData.healthStatus} onChange={handleHealthStatusChange} />
                </Paper>
                <Paper sx={{ p: 3 }} elevation={3}>
                  <AdditionalInfoForm data={formData.additionalInfo} onChange={handleAdditionalInfoChange} />
                </Paper>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
