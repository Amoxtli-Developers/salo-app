"use client";

import React from "react";
import Chart from "react-apexcharts";
import { Card, CardContent, Typography, useTheme } from "@mui/material";

export interface PopulationTrendDataPoint {
  x: string; // por ejemplo, mes, día, semana, etc.
  y: number;
}

export interface PopulationTrendChartProps {
  data: {
    id: string;
    data: PopulationTrendDataPoint[];
  }[];
}

const PopulationTrendChart: React.FC<PopulationTrendChartProps> = ({ data }) => {
  const theme = useTheme();

  // Mapeo de la data para ApexCharts
  const series = data.map((seriesItem) => ({
    name: seriesItem.id,
    data: seriesItem.data.map((point) => ({ x: point.x, y: point.y })),
  }));

  const options = {
    chart: {
      id: "population-trend-chart",
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
        text: "Total de Ajolotes",
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
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 0.5,
        opacityFrom: 0.7,
        opacityTo: 0.2,
        stops: [0, 90, 100],
      },
    },
    colors: [theme.palette.primary.main],
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
        border: `1px solid ${theme.palette.divider}`,
        boxShadow: 0,
        backgroundColor: theme.palette.background.paper,
        p: 2,
      }}
    >
      <CardContent sx={{ height: "100%" }}>
        <Typography variant="subtitle2" gutterBottom>
          Evolución de la Población
        </Typography>
        <Chart options={options} series={series} type="area" height="240" />
      </CardContent>
    </Card>
  );
};

export default PopulationTrendChart;
