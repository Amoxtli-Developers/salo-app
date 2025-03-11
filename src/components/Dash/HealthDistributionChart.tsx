"use client";

import React from "react";
import Chart from "react-apexcharts";
import { Card, Typography, useTheme } from "@mui/material";

export interface HealthDistributionData {
  id: string;
  label: string;
  value: number;
  color?: string;
}

export interface HealthDistributionChartProps {
  data: HealthDistributionData[];
}

const HealthDistributionChart: React.FC<HealthDistributionChartProps> = ({ data }) => {
  const theme = useTheme();

  // Mapeo de los datos: series (valores) y labels (nombres de categoría)
  const series = data.map((d) => d.value);
  const labels = data.map((d) => d.label);
  // Se utiliza el color definido en el dato o se toma el color primario del tema
  const colors = data.map((d) => d.color || theme.palette.primary.main);

  const options = {
    chart: {
      type: "donut" as "donut", // eslint-disable-line
      toolbar: { show: true },
    },
    labels: labels,
    colors: colors,
    legend: {
      labels: {
        colors: theme.palette.text.primary,
      },
    },
    dataLabels: {
        enabled: true,
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: false,
            name: {
              show: true,
              fontSize: "16px",
              color: theme.palette.text.primary,
              offsetY: -10,
            },
            value: {
              show: true,
              fontSize: "14px",
              color: theme.palette.text.primary,
              offsetY: 10,
            },
            total: {
              show: true,
              label: "Total",
              color: theme.palette.text.primary,
            },
          },
        },
      },
    },
    tooltip: {
      theme: theme.palette.mode === "dark" ? "dark" : "light",
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
        Distribución de Salud
      </Typography>
      <Chart options={options} series={series} type="donut" height="240" />
    </Card>
  );
};

export default HealthDistributionChart;
