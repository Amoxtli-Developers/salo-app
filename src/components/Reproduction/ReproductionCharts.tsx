"use client";

import React from "react";
import { Box, Typography, Paper, Grid } from "@mui/material";
import Chart from "react-apexcharts";

interface ReproduccionChartsProps {
  events: any[]; // eslint-disable-line
}

const ReproduccionCharts: React.FC<ReproduccionChartsProps> = ({ events }) => { // eslint-disable-line
  // Process your events data to build the line chart data.
  // For demonstration, we use dummy data.
  const lineChartOptions = {
    chart: {
      id: "line-chart",
      toolbar: { show: true },
    },
    xaxis: {
      categories: ["Jul 1", "Jul 5", "Jul 10", "Jul 15", "Jul 20"],
    },
    stroke: {
      curve: "smooth" as "smooth", // eslint-disable-line
      width: 2,
    },
    markers: {
      size: 4,
    },
    tooltip: {
      enabled: true,
    },
    dataLabels: {
      enabled: false,
    },
  };

  const lineChartSeries = [
    {
      name: "Eventos",
      data: [5, 10, 8, 12, 9],
    },
  ];

  // For the success rate, a radial bar chart is a great option to display a percentage.
  // We'll assume successRate is a percentage (e.g., 75%).
  const successRate = 75;

  const radialChartOptions = {
    chart: {
      type: "radialBar" as "radialBar", // eslint-disable-line
      offsetY: -10,
      toolbar: { show: true },
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: "60%",
        },
        dataLabels: {
          name: {
            fontSize: "16px",
            color: "#333",
          },
          value: {
            fontSize: "22px",
            color: "#333",
            formatter: (val: number) => `${val}%`,
          },
        },
      },
    },
    labels: ["Tasa de Éxito"],
  };

  const radialChartSeries = [successRate];

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }} elevation={2}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Evolución de Eventos Reproductivos
          </Typography>
          <Box sx={{ height: 300 }}>
            <Chart
              options={lineChartOptions}
              series={lineChartSeries}
              type="line"
              height="100%"
            />
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }} elevation={2}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Tasa de Éxito
          </Typography>
          <Box sx={{ height: 300, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Chart
              options={radialChartOptions}
              series={radialChartSeries}
              type="radialBar"
              height="100%"
            />
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ReproduccionCharts;
