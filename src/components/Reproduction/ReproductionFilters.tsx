"use client";

import React from "react";
import { Grid, TextField, MenuItem } from "@mui/material";
import DateRangePickerInput from "@/components/Axolotls/DateFilterPicker"; // Reuse your date picker

interface ReproduccionFiltersProps {
  dateRange: [Date | null, Date | null];
  setDateRange: (value: [Date | null, Date | null]) => void;
  estadoEvento: string;
  setEstadoEvento: (value: string) => void;
  tipoReproduccion: string;
  setTipoReproduccion: (value: string) => void;
  resultado: string;
  setResultado: (value: string) => void;
}

const ReproduccionFilters: React.FC<ReproduccionFiltersProps> = ({
  dateRange,
  setDateRange,
  estadoEvento,
  setEstadoEvento,
  tipoReproduccion,
  setTipoReproduccion,
  resultado,
  setResultado,
}) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={3}>
        <DateRangePickerInput value={dateRange} onChange={setDateRange} />
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField
          label="Estado del Evento"
          variant="outlined"
          size="small"
          fullWidth
          select
          value={estadoEvento}
          onChange={(e) => setEstadoEvento(e.target.value)}
        >
          <MenuItem value="">Todos</MenuItem>
          <MenuItem value="Programado">Programado</MenuItem>
          <MenuItem value="En Proceso">En Proceso</MenuItem>
          <MenuItem value="Finalizado">Finalizado</MenuItem>
          <MenuItem value="Cancelado">Cancelado</MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField
          label="Tipo de Reproducción"
          variant="outlined"
          size="small"
          fullWidth
          select
          value={tipoReproduccion}
          onChange={(e) => setTipoReproduccion(e.target.value)}
        >
          <MenuItem value="">Todos</MenuItem>
          <MenuItem value="Natural">Natural</MenuItem>
          <MenuItem value="Intervención Controlada">Intervención Controlada</MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField
          label="Resultado del Evento"
          variant="outlined"
          size="small"
          fullWidth
          select
          value={resultado}
          onChange={(e) => setResultado(e.target.value)}
        >
          <MenuItem value="">Todos</MenuItem>
          <MenuItem value="Sin Resultado">Sin Resultado</MenuItem>
          <MenuItem value="Exitoso">Exitoso</MenuItem>
          <MenuItem value="Fallido">Fallido</MenuItem>
        </TextField>
      </Grid>
    </Grid>
  );
};

export default ReproduccionFilters;
