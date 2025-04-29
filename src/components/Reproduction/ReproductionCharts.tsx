"use client";

import React, { useMemo } from "react";
import { Box, Typography, Grid, useTheme, alpha, Card } from "@mui/material";
import Chart from "react-apexcharts";
import { ReproduccionEvent } from "@/components/Reproduction/ReproductionEventsTable";

interface ReproduccionChartsProps {
    events: ReproduccionEvent[];
}

const ReproduccionCharts: React.FC<ReproduccionChartsProps> = ({ events }) => {
    const theme = useTheme();

    // Process events data for charts
    const chartData = useMemo(() => {
        // For time series chart, we need to group events by dates
        const eventsByMonth: Record<string, number> = {};
        const successRateByMonth: Record<
            string,
            { total: number; success: number }
        > = {};

        // Calculate event states
        const eventStates = {
            Programado: 0,
            "En Proceso": 0,
            Finalizado: 0,
            Cancelado: 0,
        };

        // Calculate result distribution
        const resultTypes: Record<string, number> = {};

        events.forEach((event) => {
            // Process for timeline chart
            const date = new Date(event.fechaProgramada);
            const monthKey = `${date.getFullYear()}-${String(
                date.getMonth() + 1
            ).padStart(2, "0")}`;

            eventsByMonth[monthKey] = (eventsByMonth[monthKey] || 0) + 1;

            // Process for success rate
            if (event.estado === "Finalizado") {
                if (!successRateByMonth[monthKey]) {
                    successRateByMonth[monthKey] = { total: 0, success: 0 };
                }

                successRateByMonth[monthKey].total += 1;

                if (event.resultado === "Exitoso") {
                    successRateByMonth[monthKey].success += 1;
                }
            }

            // Count event states
            if (event.estado in eventStates) {
                eventStates[event.estado as keyof typeof eventStates] += 1;
            }

            // Count result types
            if (event.resultado) {
                resultTypes[event.resultado] =
                    (resultTypes[event.resultado] || 0) + 1;
            }
        });

        // Sort months chronologically for the line chart
        const sortedMonths = Object.keys(eventsByMonth).sort();

        // Format dates for display (e.g., "Jan 2023")
        const formattedMonths = sortedMonths.map((month) => {
            const [year, monthNum] = month.split("-");
            return new Date(
                parseInt(year),
                parseInt(monthNum) - 1
            ).toLocaleDateString("es-ES", { month: "short", year: "numeric" });
        });

        // Calculate overall success rate
        const totalFinalized = events.filter(
            (e) => e.estado === "Finalizado"
        ).length;
        const successfulEvents = events.filter(
            (e) => e.resultado === "Exitoso"
        ).length;
        const successRate =
            totalFinalized > 0
                ? Math.round((successfulEvents / totalFinalized) * 100)
                : 0;

        // Create success rate over time series
        const successRateSeries = sortedMonths.map((month) => {
            const data = successRateByMonth[month];
            if (data && data.total > 0) {
                return Math.round((data.success / data.total) * 100);
            }
            return null;
        });

        return {
            timelineMonths: formattedMonths,
            eventCounts: sortedMonths.map((month) => eventsByMonth[month]),
            successRateSeries,
            successRate,
            eventStates,
            resultTypes,
        };
    }, [events]);

    // Timeline chart configuration
    const lineChartOptions = {
        chart: {
            id: "events-timeline",
            toolbar: {
                show: false, // Hide toolbar to save space
            },
            animations: {
                enabled: true,
                easing: "easeinout",
                speed: 800,
            },
            background: "transparent",
        },
        colors: [
            theme.palette.primary.main,
            alpha(theme.palette.primary.main, 0.7),
        ],
        xaxis: {
            categories: chartData.timelineMonths,
            labels: {
                style: {
                    colors: theme.palette.text.secondary,
                    fontSize: "10px", // Smaller font
                },
                rotateAlways: true,
                hideOverlappingLabels: true,
            },
            axisBorder: {
                color: theme.palette.divider,
            },
            axisTicks: {
                color: theme.palette.divider,
            },
        },
        yaxis: {
            labels: {
                style: {
                    colors: theme.palette.text.secondary,
                    fontSize: "10px", // Smaller font
                },
                formatter: (value: number) => Math.round(value).toString(),
            },
        },
        grid: {
            borderColor: alpha(theme.palette.divider, 0.5),
            strokeDashArray: 4,
            xaxis: {
                lines: {
                    show: true,
                },
            },
            yaxis: {
                lines: {
                    show: true,
                },
            },
            padding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
            },
        },
        stroke: {
            curve: "smooth" as "smooth",
            width: [3, 2],
            dashArray: [0, 5],
        },
        markers: {
            size: 3, // Smaller markers
            strokeWidth: 1,
            hover: {
                size: 4,
            },
        },
        tooltip: {
            theme: theme.palette.mode,
            y: {
                formatter: (value: number) => `${value} eventos`,
            },
        },
        dataLabels: {
            enabled: false,
        },
        legend: {
            position: "top" as "top",
            horizontalAlign: "right" as "right",
            fontSize: "10px", // Smaller font
            height: 30,
            offsetY: -5,
            labels: {
                colors: theme.palette.text.primary,
            },
        },
    };

    const lineChartSeries = [
        {
            name: "Eventos",
            data: chartData.eventCounts,
        },
        {
            name: "Tasa de Éxito (%)",
            data: chartData.successRateSeries,
        },
    ];

    // Success rate radial chart
    const radialChartOptions = {
        chart: {
            type: "radialBar" as "radialBar",
            offsetY: -10,
            sparkline: {
                enabled: true,
            },
            background: "transparent",
        },
        colors: [
            chartData.successRate > 70
                ? theme.palette.success.main
                : chartData.successRate > 40
                ? theme.palette.warning.main
                : theme.palette.error.main,
        ],
        plotOptions: {
            radialBar: {
                startAngle: -90,
                endAngle: 90,
                hollow: {
                    size: "65%",
                },
                track: {
                    background: alpha(theme.palette.divider, 0.3),
                    strokeWidth: "97%",
                },
                dataLabels: {
                    name: {
                        show: true,
                        fontSize: "12px", // Smaller font
                        fontWeight: 600,
                        color: theme.palette.text.secondary,
                        offsetY: -5,
                    },
                    value: {
                        offsetY: -2,
                        fontSize: "20px", // Smaller font
                        fontWeight: 700,
                        color: theme.palette.text.primary,
                        formatter: (val: number) => `${val}%`,
                    },
                },
            },
        },
        fill: {
            type: "gradient",
            gradient: {
                shade: "dark",
                type: "horizontal",
                shadeIntensity: 0.5,
                gradientToColors: [theme.palette.primary.main],
                stops: [0, 100],
            },
        },
        labels: ["Tasa de Éxito"],
        title: {
            text: "Efectividad",
            align: "center" as "center",
            style: {
                fontSize: "12px", // Smaller font
                fontWeight: 600,
                color: theme.palette.text.secondary,
            },
            offsetY: -5,
        },
    };

    const radialChartSeries = [chartData.successRate];

    // Status distribution chart
    const statusChartOptions = {
        chart: {
            type: "pie" as "pie",
            background: "transparent",
        },
        labels: Object.keys(chartData.eventStates),
        colors: [
            theme.palette.info.main, // Programado
            theme.palette.warning.main, // En Proceso
            theme.palette.success.main, // Finalizado
            theme.palette.error.main, // Cancelado
        ],
        legend: {
            position: "bottom" as "bottom",
            fontSize: "10px", // Smaller font
            offsetY: 0,
            height: 40,
            markers: {
                size: 8,
            },
            labels: {
                colors: theme.palette.text.primary,
            },
        },
        dataLabels: {
            enabled: true,
            style: {
                fontSize: "10px", // Smaller font
                fontWeight: 500,
                colors: ["#fff"],
            },
            dropShadow: {
                enabled: false,
            },
        },
        stroke: {
            width: 1,
            colors: [theme.palette.background.paper],
        },
        tooltip: {
            theme: theme.palette.mode,
            y: {
                formatter: (value: number) => `${value} eventos`,
            },
        },
        title: {
            text: "Distribución por Estado",
            align: "center" as "center",
            style: {
                fontSize: "12px", // Smaller font
                fontWeight: 600,
                color: theme.palette.text.secondary,
            },
            offsetY: -5,
        },
    };

    const statusChartSeries = Object.values(chartData.eventStates);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} lg={6}>
                <Card
                    sx={{
                        height: 300,
                        border: (theme) => `1px solid ${theme.palette.divider}`,
                        boxShadow: 0,
                        backgroundColor: (theme) =>
                            theme.palette.background.paper,
                        p: 2,
                    }}
                >
                    <Typography variant="subtitle2" gutterBottom>
                        Evolución de Eventos Reproductivos
                    </Typography>
                    <Box sx={{ height: 240 }}>
                        <Chart
                            options={lineChartOptions}
                            series={lineChartSeries}
                            type="line"
                            height="100%"
                            width="100%"
                        />
                    </Box>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} lg={6}>
                <Card
                    sx={{
                        height: 300,
                        border: (theme) => `1px solid ${theme.palette.divider}`,
                        boxShadow: 0,
                        backgroundColor: (theme) =>
                            theme.palette.background.paper,
                        p: 2,
                    }}
                >
                    <Typography variant="subtitle2" gutterBottom>
                        Tasa de Éxito Global
                    </Typography>
                    <Box
                        sx={{
                            height: 600,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Chart
                            options={radialChartOptions}
                            series={radialChartSeries}
                            type="radialBar"
                            height="100%"
                            width="100%"
                        />
                    </Box>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
                <Card
                    sx={{
                        height: 300,
                        border: (theme) => `1px solid ${theme.palette.divider}`,
                        boxShadow: 0,
                        backgroundColor: (theme) =>
                            theme.palette.background.paper,
                        p: 2,
                    }}
                >
                    <Typography variant="subtitle2" gutterBottom>
                        Estado de Eventos
                    </Typography>
                    <Box sx={{ height: 240 }}>
                        <Chart
                            options={statusChartOptions}
                            series={statusChartSeries}
                            type="pie"
                            height="100%"
                            width="100%"
                        />
                    </Box>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} lg={8}>
                <Card
                    sx={{
                        height: 300,
                        border: (theme) => `1px solid ${theme.palette.divider}`,
                        boxShadow: 0,
                        backgroundColor: (theme) =>
                            theme.palette.background.paper,
                        p: 2,
                    }}
                >
                    <Typography variant="subtitle2" gutterBottom>
                        Estadísticas Clave
                    </Typography>
                    <Box
                        sx={{
                            height: 240,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            px: 2,
                            overflow: "auto",
                        }}
                    >
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            textAlign="center"
                        >
                            {events.length === 0
                                ? "No hay suficientes datos para mostrar estadísticas detalladas"
                                : `Se han registrado ${
                                      events.length
                                  } eventos de reproducción en total. 
                 ${
                     chartData.eventStates.Finalizado
                 } han finalizado, de los cuales 
                 ${
                     events.filter((e) => e.resultado === "Exitoso").length
                 } fueron exitosos, 
                 lo que representa una tasa de éxito del ${
                     chartData.successRate
                 }%.`}
                        </Typography>
                    </Box>
                </Card>
            </Grid>
        </Grid>
    );
};

export default ReproduccionCharts;
