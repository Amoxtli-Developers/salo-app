"use client";

import React from "react";
import { ResponsiveLine } from "@nivo/line";
import { Card, CardContent, Typography, useTheme } from "@mui/material";

export interface TrendDataPoint {
    x: string; // e.g., month
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
                <ResponsiveLine
                    data={data}
                    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                    xScale={{ type: "point" }}
                    yScale={{
                        type: "linear",
                        min: "auto",
                        max: "auto",
                        stacked: false,
                        reverse: false,
                    }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: "Tiempo",
                        legendOffset: 36,
                        legendPosition: "middle",
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: "Cantidad",
                        legendOffset: -40,
                        legendPosition: "middle",
                    }}
                    colors={{ scheme: "nivo" }}
                    pointSize={10}
                    pointColor={{ theme: "background" }}
                    pointBorderWidth={2}
                    pointBorderColor={{ from: "serieColor" }}
                    pointLabelYOffset={-12}
                    useMesh={true}
                    legends={[
                        {
                            anchor: "bottom-right",
                            direction: "column",
                            justify: false,
                            translateX: 100,
                            translateY: 0,
                            itemsSpacing: 0,
                            itemDirection: "left-to-right",
                            itemWidth: 80,
                            itemHeight: 20,
                            itemOpacity: 0.75,
                            symbolSize: 12,
                            symbolShape: "circle",
                            symbolBorderColor: "rgba(0, 0, 0, .5)",
                            effects: [
                                {
                                    on: "hover",
                                    style: {
                                        itemBackground: "rgba(0, 0, 0, .03)",
                                        itemOpacity: 1,
                                    },
                                },
                            ],
                        },
                    ]}
                    // Custom theme for Nivo charts to use text primary color
                    theme={{
                        axis: {
                            ticks: {
                                text: { fill: theme.palette.text.primary },
                            },
                            legend: {
                                text: { fill: theme.palette.text.primary },
                            },
                        },
                        legends: {
                            text: { fill: theme.palette.text.primary },
                        },
                        tooltip: {
                            container: {
                                color: theme.palette.text.primary,
                            },
                        },
                    }}
                />
            </CardContent>
        </Card>
    );
};

export default MortalityBirthTrendChart;
