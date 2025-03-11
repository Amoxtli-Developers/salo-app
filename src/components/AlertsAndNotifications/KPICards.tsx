import React from "react";
import { Grid, Card, Typography } from "@mui/material";

interface KPICardsProps {
  data: {
    totalActive: number;
    pending: number;
    attended: number;
    critical: number;
  };
}

const KPICards: React.FC<KPICardsProps> = ({ data }) => {
  const cardStyle = { p: 2, textAlign: "center", border: (theme: { palette: { divider: any; }; }) => `1px solid ${theme.palette.divider}`, boxShadow: 0, backgroundColor: (theme: { palette: { background: { paper: any; }; }; }) => theme.palette.background.paper, }; // eslint-disable-line
  return ( 
    <Grid container spacing={2} mb={4}>
      <Grid item xs={6} md={3}>
        <Card sx={cardStyle}>
          <Typography variant="h4">{data.totalActive}</Typography>
          <Typography variant="h6">Alertas Activas</Typography>
        </Card>
      </Grid>
      <Grid item xs={6} md={3}>
        <Card sx={cardStyle}>
          <Typography variant="h4">{data.pending}</Typography>
          <Typography variant="h6">Pendientes</Typography>
        </Card>
      </Grid>
      <Grid item xs={6} md={3}>
        <Card sx={cardStyle}>
          <Typography variant="h4">{data.attended}</Typography>
          <Typography variant="h6">Atendidas</Typography>
        </Card>
      </Grid>
      <Grid item xs={6} md={3}>
        <Card sx={cardStyle}>
          <Typography variant="h4">{data.critical}</Typography>
          <Typography variant="h6">Críticas</Typography>
        </Card>
      </Grid>
    </Grid>
  );
};

export default KPICards;
