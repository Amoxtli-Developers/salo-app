"use client";

import React from "react";
import { ResponsivePie } from "@nivo/pie";
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
    return (
        <Card sx={{ height: 300 , border: (theme) => `1px solid ${theme.palette.divider}`, boxShadow: 0, backgroundColor: (theme) => theme.palette.background.paper, p: 4}}>
            <Typography variant="subtitle2" gutterBottom>
                Distribución de Salud
            </Typography>
            <ResponsivePie
                data={data}
                margin={{ top: 30, right: 50, bottom: 30, left: 50 }}
                innerRadius={0.5}  // creates a donut chart effect
                padAngle={0.7}
                cornerRadius={3}
                activeOuterRadiusOffset={8}
                colors={{ datum: "data.color" }}
                borderWidth={1}
                borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
                arcLinkLabelsSkipAngle={10}
                arcLinkLabelsTextColor={theme.palette.text.primary}
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: "color" }}
                arcLabelsSkipAngle={10}
                arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
            />
        </Card>
    );
};

export default HealthDistributionChart;
