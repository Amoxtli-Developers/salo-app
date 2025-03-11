"use client";

import React from "react";
import Chart from "react-apexcharts";
import { Card, Typography, useTheme } from "@mui/material";

export interface PendingAlertsData {
  category: string;
  count: number;
  [key: string]: string | number;
}

export interface PendingAlertsChartProps {
  data: PendingAlertsData[];
}

const PendingAlertsChart: React.FC<PendingAlertsChartProps> = ({ data }) => {
  const theme = useTheme();

  // Mapeo de la data a series y categorías
  const series = [
    {
      name: "Alertas",
      data: data.map((item) => item.count),
    },
  ];

  const options = {
    chart: {
      type: "bar" as "bar", // eslint-disable-line
      toolbar: { show: true },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: [theme.palette.background.paper],
      },
    },
    xaxis: {
      categories: data.map((item) => item.category),
      title: {
        text: "Categoría",
        style: { color: theme.palette.text.primary },
      },
      labels: {
        style: { colors: theme.palette.text.primary },
      },
    },
    yaxis: {
      title: {
        text: "Alertas",
        style: { color: theme.palette.text.primary },
      },
      labels: {
        style: { colors: theme.palette.text.primary },
      },
    },
    legend: {
      labels: { colors: theme.palette.text.primary },
    },
    colors: [theme.palette.primary.main],
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
        Alertas Pendientes por Tipo
      </Typography>
      <Chart options={options} series={series} type="bar" height="240" />
    </Card>
  );
};

export default PendingAlertsChart;
