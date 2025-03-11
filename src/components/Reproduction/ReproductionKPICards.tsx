"use client";

import React from "react";
import { Grid, Paper, Typography } from "@mui/material";

interface ReproduccionKPICardsProps {
  data: {
    totalEvents: number;
    newPairs: number;
    eventsInProgress: number;
    successRate: number;
  };
}

const ReproduccionKPICards: React.FC<ReproduccionKPICardsProps> = ({ data }) => {
    const cardStyle = { p: 2, textAlign: "center", border: (theme: { palette: { divider: any; }; }) => `1px solid ${theme.palette.divider}`, boxShadow: 0, backgroundColor: (theme: { palette: { background: { paper: any; }; }; }) => theme.palette.background.paper, }; // eslint-disable-line

  return (
    <Grid container spacing={2}>
      <Grid item xs={6} md={3}>
        <Paper sx={cardStyle} elevation={2}>
          <Typography variant="h4">{data.totalEvents}</Typography>
          <Typography variant="h6">Total de Eventos</Typography>
        </Paper>
      </Grid>
      <Grid item xs={6} md={3}>
        <Paper sx={cardStyle} elevation={2}>
          <Typography variant="h4">{data.newPairs}</Typography>
          <Typography variant="h6">Nuevas Parejas Formadas</Typography>
        </Paper>
      </Grid>
      <Grid item xs={6} md={3}>
        <Paper sx={cardStyle} elevation={2}>
          <Typography variant="h4">{data.eventsInProgress}</Typography>
          <Typography variant="h6">Eventos en Curso</Typography>
        </Paper>
      </Grid>
      <Grid item xs={6} md={3}>
        <Paper sx={cardStyle} elevation={2}>
          <Typography variant="h4">{data.successRate}%</Typography>
          <Typography variant="h6">Tasa de Éxito</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ReproduccionKPICards;
