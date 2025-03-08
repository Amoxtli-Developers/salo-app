"use client";

import React from "react";
import {
    Card,
    CardContent,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Typography,
    useTheme,
} from "@mui/material";

export interface AxolotlInventory {
    id: number | string;
    name: string;
    health: string;
    age: string;
}

export interface AxolotlInventoryCardProps {
    data: AxolotlInventory[];
}

const AxolotlInventoryCard: React.FC<AxolotlInventoryCardProps> = ({ data }) => {
    const theme = useTheme();
    return (
         <Card sx={{ height: 300 , border: (theme) => `1px solid ${theme.palette.divider}`, boxShadow: 0, backgroundColor: (theme) => theme.palette.background.paper, p: 4}}>
            <CardContent>
                <Typography variant="subtitle2" gutterBottom mb={2}>
                    Mis Axolotls
                </Typography>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Salud</TableCell>
                            <TableCell>Edad</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.health}</TableCell>
                                <TableCell>{row.age}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default AxolotlInventoryCard;
