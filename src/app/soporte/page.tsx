"use client";

import React from "react";
import { Box, Typography, Divider, Stack, Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Sidebar from "@/components/Layout/Sidebar";
import Navbar from "@/components/Layout/Navbar";
import FaqAccordion from "@/components/HelpSupport/FaqAccordion";
import SupportForm from "@/components/HelpSupport/SupportForm";

export default function HelpSupportPage() {
  const theme = useTheme();

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, bgcolor: "background.default", minHeight: "100vh" }}>
        <Navbar />
        <Box sx={{ p: { xs: 2, md: 4 } }}>
          {/* Header */}
          <Stack spacing={2} sx={{ mb: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: "bold", color: theme.palette.primary.main }}>
              Centro de Ayuda y Soporte
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Encuentra respuestas a tus preguntas más comunes en nuestra sección de Preguntas Frecuentes o, si necesitas asistencia personalizada, contacta a nuestro equipo de Soporte Técnico.
            </Typography>
          </Stack>

          <Divider sx={{ my: 3 }} />

          {/* FAQ Section */}
          <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
              Preguntas Frecuentes (FAQ)
            </Typography>
            <FaqAccordion />
          </Paper>

          <Divider sx={{ my: 3 }} />

          {/* Support Form Section */}
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
              Soporte Técnico y Contacto
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
             Si no encuentras la respuesta que buscas en nuestras FAQ, completa el siguiente formulario para resolver dudas, problemas con la aplicación o cualquier otro tema que requiera soporte técnico. Nuestro equipo se pondrá en contacto contigo a la brevedad y responderá en un plazo de 24-48 horas.
            </Typography>

            <SupportForm />
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}
