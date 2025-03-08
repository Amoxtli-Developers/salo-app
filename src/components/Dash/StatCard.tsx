"use client";

import React from "react";
import {
    Card,
    CardContent,
    Box,
    Typography,
    Chip,
    SxProps,
    Theme,
} from "@mui/material";

export interface StatCardProps {
    /**
     * An optional icon displayed at the top left (e.g., a MUI icon or custom SVG).
     */
    icon?: React.ReactNode;
    /**
     * The main title or label of the card (e.g., "Tank Temperature").
     */
    title: string;
    /**
     * The primary numeric or textual value (e.g., "26°C").
     */
    value: string | number;
    /**
     * The color for the primary value text (e.g., "text.primary", "success.main").
     */
    valueColor?: string;
    /**
     * A sub-value (e.g., "+0.5° from yesterday"), displayed in a Chip on the right.
     */
    subValue?: string;
    /**
     * Additional styling for the root Card component.
     */
    sx?: SxProps<Theme>;
}

function getChipColor(subValue: string | undefined): "default" | "success" | "error" | "info" {
    if (!subValue) return "default";

    // Simple check for plus/minus sign
    if (subValue.trim().startsWith("+")) {
        return "success";
    } else if (subValue.trim().startsWith("-")) {
        return "error";
    }
    return "info";
}

const StatCard: React.FC<StatCardProps> = ({
    icon,
    title,
    value,
    valueColor = "text.primary",
    subValue,
    sx,
}) => {
    const subValueColor = getChipColor(subValue);

    return (
        <Card
            sx={{
                border: (theme) => `1px solid ${theme.palette.divider}`,
                boxShadow: 0,
                backgroundColor: (theme) => theme.palette.background.paper,
                ...sx,
            }}
        >
            <CardContent>
                {/* Top Row: Icon + Title */}
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    {icon && (
                        <Box sx={{ mr: 1, display: "flex", alignItems: "center" }}>
                            {icon}
                        </Box>
                    )}
                    <Typography variant="body2" color="text.secondary">
                        {title}
                    </Typography>
                </Box>

                {/* Middle Row: Primary Value + SubValue Chip */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 600,
                            color: valueColor,
                        }}
                    >
                        {value}
                    </Typography>

                    {subValue && (
                        <Chip
                            label={subValue}
                            color={subValueColor}
                            size="small"
                            sx={{
                                fontWeight: 500,
                            }}
                        />
                    )}
                </Box>
            </CardContent>
        </Card>
    );
};

export default StatCard;
