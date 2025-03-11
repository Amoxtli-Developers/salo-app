"use client";

import React from "react";
import Chart from "react-apexcharts";
import { Card, CardContent, Typography, useTheme } from "@mui/material";

export interface HealthInterventionDataPoint {
  x: string; // por ejemplo, mes, trimestre, etc.
  y: number;
}

export interface HealthInterventionsChartProps {
  data: {
    id: string;
    data: HealthInterventionDataPoint[];
  }[];
}

const HealthInterventionsChart: React.FC<HealthInterventionsChartProps> = ({ data }) => {
  const theme = useTheme();

  // Se mapea la data a las series que espera ApexCharts
  const series = data.map((seriesItem) => ({
    name: seriesItem.id,
    data: seriesItem.data.map((point) => ({ x: point.x, y: point.y })),
  }));

  const options = {
    chart: {
      id: "health-interventions-chart",
      toolbar: { show: true },
    },
    xaxis: {
      type: "category" as "category", // eslint-disable-line
      title: {
        text: "Tiempo",
        style: { color: theme.palette.text.primary },
      },
      labels: {
        style: { colors: theme.palette.text.primary },
      },
    },
    yaxis: {
      title: {
        text: "Intervenciones",
        style: { color: theme.palette.text.primary },
      },
      labels: {
        style: { colors: theme.palette.text.primary },
      },
    },
    stroke: {
      curve: "smooth" as "smooth", // eslint-disable-line
      width: 2,
    },
    markers: {
      size: 4,
    },
    colors: data.map((_, index) =>
      index === 0 ? theme.palette.primary.main : theme.palette.error.main
    ),
    tooltip: {
      theme: theme.palette.mode === "dark" ? "dark" : "light",
    },
    legend: {
      labels: { colors: theme.palette.text.primary },
    },
  };

  return (
    <Card
      sx={{
        height: 300,
        border: (theme) => `1px solid ${theme.palette.divider}`,
        boxShadow: 0,
        backgroundColor: (theme) => theme.palette.background.paper,
        p: 2,
      }}
    >
      <CardContent sx={{ height: "100%" }}>
        <Typography variant="subtitle2" gutterBottom>
          Intervenciones de Salud a lo Largo del Tiempo
        </Typography>
        <Chart options={options} series={series} type="line" height="240" />
      </CardContent>
    </Card>
  );
};

export default HealthInterventionsChart;
