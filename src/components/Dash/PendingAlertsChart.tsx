"use client";

import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import { Card, Typography, useTheme, Box } from "@mui/material";

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

    return (
        <Card
            sx={{
                height: 300,
                border: (theme) => `1px solid ${theme.palette.divider}`,
                boxShadow: 0,
                backgroundColor: (theme) => theme.palette.background.paper,
                p: 4,
            }}
        >
            <Typography variant="subtitle2" gutterBottom>
                Alertas Pendientes por Tipo
            </Typography>
            <Box sx={{ height: 250 }}>
                <ResponsiveBar
                    data={data}
                    keys={["count"]}
                    indexBy="category"
                    margin={{ top: 30, right: 50, bottom: 60, left: 50 }}
                    padding={0.3}
                    valueScale={{ type: "linear" }}
                    indexScale={{ type: "band", round: true }}
                    colors={() => theme.palette.primary.main}
                    borderColor={{
                        from: "color",
                        modifiers: [["darker", 1.6]],
                    }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: "Categoría",
                        legendPosition: "middle",
                        legendOffset: 32,
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: "Alertas",
                        legendPosition: "middle",
                        legendOffset: -40,
                    }}
                    labelSkipWidth={12}
                    labelSkipHeight={12}
                    labelTextColor={() => theme.palette.background.paper}
                    animate={true}
                    motionConfig="stiff"
                    theme={{
                        axis: {
                            ticks: {
                                text: {
                                    fill: theme.palette.text.primary,
                                    fontSize: 12,
                                },
                            },
                            legend: {
                                text: {
                                    fill: theme.palette.text.primary,
                                    fontSize: 12,
                                },
                            },
                        },
                        legends: {
                            text: {
                                fill: theme.palette.text.primary,
                                fontSize: 12,
                            },
                        },
                        tooltip: {
                            container: {
                                color: theme.palette.text.primary,
                            },
                        },
                    }}
                />
            </Box>
        </Card>
    );
};

export default PendingAlertsChart;
