import React from "react";
import { Grid, TextField, MenuItem } from "@mui/material";
import DateRangePickerInput from "@/components/Axolotls/DateFilterPicker";

interface GlobalFiltersProps {
  dateRange: [Date | null, Date | null];
  setDateRange: (value: [Date | null, Date | null]) => void;
  prioridad: string;
  setPrioridad: (value: string) => void;
  alertType: string;
  setAlertType: (value: string) => void;
  alertStatus: string;
  setAlertStatus: (value: string) => void;
}

const GlobalFilters: React.FC<GlobalFiltersProps> = ({
  dateRange,
  setDateRange,
  prioridad,
  setPrioridad,
  alertType,
  setAlertType,
  alertStatus,
  setAlertStatus,
}) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={3}>
        <DateRangePickerInput value={dateRange} onChange={setDateRange} />
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField
          label="Prioridad de Alerta"
          variant="outlined"
          size="small"
          fullWidth
          select
          value={prioridad}
          onChange={(e) => setPrioridad(e.target.value)}
        >
          <MenuItem value="">Todas</MenuItem>
          <MenuItem value="Alta">Alta</MenuItem>
          <MenuItem value="Media">Media</MenuItem>
          <MenuItem value="Baja">Baja</MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField
          label="Tipo de Alerta"
          variant="outlined"
          size="small"
          fullWidth
          select
          value={alertType}
          onChange={(e) => setAlertType(e.target.value)}
        >
          <MenuItem value="">Todos</MenuItem>
          <MenuItem value="Vacunación">Vacunación</MenuItem>
          <MenuItem value="Revisión">Revisión</MenuItem>
          <MenuItem value="Tratamiento">Tratamiento</MenuItem>
          <MenuItem value="Evento Crítico">Evento Crítico</MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField
          label="Estado de la Alerta"
          variant="outlined"
          size="small"
          fullWidth
          select
          value={alertStatus}
          onChange={(e) => setAlertStatus(e.target.value)}
        >
          <MenuItem value="">Todas</MenuItem>
          <MenuItem value="Pendiente">Pendiente</MenuItem>
          <MenuItem value="Atendida">Atendida</MenuItem>
        </TextField>
      </Grid>
    </Grid>
  );
};

export default GlobalFilters;
