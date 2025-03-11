import React from "react";
import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import DateFilterPicker from "./DateFilterPicker";

interface FilterPanelProps {
  sexo: string;
  setSexo: (value: string) => void;
  estado: string;
  setEstado: (value: string) => void;
  fechaRegistro: [Date | null, Date | null];
  setFechaRegistro: (value: [Date | null, Date | null]) => void;
  edad: string;
  setEdad: (value: string) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  sexo,
  setSexo,
  estado,
  setEstado,
  fechaRegistro,
  setFechaRegistro,
  edad,
  setEdad,
}) => {
  return (
    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
      <FormControl sx={{ minWidth: 120 }} size="small">
        <InputLabel id="sexo-label">Sexo</InputLabel>
        <Select
          labelId="sexo-label"
          value={sexo}
          label="Sexo"
          onChange={(e) => setSexo(e.target.value)}
        >
          <MenuItem value="">Todos</MenuItem>
          <MenuItem value="Masculino">Masculino</MenuItem>
          <MenuItem value="Femenino">Femenino</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: 200 }} size="small">
        <InputLabel id="estado-label">Estado de Salud</InputLabel>
        <Select
          labelId="estado-label"
          value={estado}
          label="Estado de Salud"
          onChange={(e) => setEstado(e.target.value)}
        >
          <MenuItem value="">Todos</MenuItem>
          <MenuItem value="Bueno">Bueno</MenuItem>
          <MenuItem value="Regular">Regular</MenuItem>
          <MenuItem value="Crítico">Crítico</MenuItem>
        </Select>
      </FormControl>
      <DateFilterPicker value={fechaRegistro} onChange={setFechaRegistro} />
      <FormControl sx={{ minWidth: 150 }} size="small">
        <InputLabel id="edad-label">Edad</InputLabel>
        <Select
          labelId="edad-label"
          value={edad}
          label="Edad"
          onChange={(e) => setEdad(e.target.value)}
        >
          <MenuItem value="">Todos</MenuItem>
          <MenuItem value="0-6 meses">0-6 meses</MenuItem>
          <MenuItem value="6-12 meses">6-12 meses</MenuItem>
          <MenuItem value="más de 1 año">Más de 1 año</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default FilterPanel;
