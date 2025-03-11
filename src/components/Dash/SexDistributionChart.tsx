"use client";

import React from "react";
import Chart from "react-apexcharts";
import { Card, Typography, useTheme } from "@mui/material";

export interface SexDistributionData {
  id: string;
  label: string;
  value: number;
  color?: string;
}

export interface SexDistributionChartProps {
  data: SexDistributionData[];
}

const SexDistributionChart: React.FC<SexDistributionChartProps> = ({ data }) => {
  const theme = useTheme();

  // Se mapean los valores y etiquetas para ApexCharts
  const series = data.map((d) => d.value);
  const labels = data.map((d) => d.label);
  const colors = data.map((d) => d.color || theme.palette.primary.main);

  const options = {
    chart: {
      type: "pie" as const,
      toolbar: { show: true },
    },
    labels: labels,
    colors: colors,
    legend: {
      labels: {
        colors: theme.palette.text.primary,
      },
    },
    tooltip: {
      theme: theme.palette.mode === "dark" ? "dark" : "light",
    },
    dataLabels: {
      enabled: true,
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
      <Typography variant="subtitle2" gutterBottom>
        Distribución de Sexo
      </Typography>
      <Chart options={options} series={series} type="pie" height="240" />
    </Card>
  );
};

export default SexDistributionChart;
