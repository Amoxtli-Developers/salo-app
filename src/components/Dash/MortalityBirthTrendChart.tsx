"use client";

import React from "react";
import Chart from "react-apexcharts";
import { Card, CardContent, Typography, useTheme } from "@mui/material";

export interface TrendDataPoint {
  x: string; // por ejemplo, mes
  y: number;
}

export interface MortalityBirthTrendChartProps {
  data: {
    id: string;
    data: TrendDataPoint[];
  }[];
}

const MortalityBirthTrendChart: React.FC<MortalityBirthTrendChartProps> = ({ data }) => {
  const theme = useTheme();

  // Mapeo de la data a las series que espera ApexCharts
  const series = data.map((seriesItem) => ({
    name: seriesItem.id,
    data: seriesItem.data.map((point) => ({ x: point.x, y: point.y })),
  }));

  const options = {
    chart: {
      id: "mortality-birth-trend-chart",
      toolbar: { show: true },
    },
    xaxis: {
      type: "category" as "category", // eslint-disable-line
      title: {
        text: "Tiempo",
        style: { color: theme.palette.text.primary },
      },
    },
    yaxis: {
      title: {
        text: "Cantidad",
        style: { color: theme.palette.text.primary },
      },
    },
    legend: {
      position: "bottom" as "bottom", // eslint-disable-line
      labels: {
        colors: theme.palette.text.primary,
      },
    },
    colors: [theme.palette.primary.main, theme.palette.error.main],
    tooltip: {
      theme: theme.palette.mode === "dark" ? "dark" : "light",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth" as "smooth", // eslint-disable-line
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
          Tendencia de Mortalidad y Natalidad
        </Typography>
        <Chart options={options} series={series} type="line" height="240" />
      </CardContent>
    </Card>
  );
};

export default MortalityBirthTrendChart;
