import React from "react";
import {
  Box,
  TextField,
  MenuItem,
  Typography,
  FormHelperText
} from "@mui/material";

export interface HealthStatusData {
  estadoSalud: string;
  notasSalud: string;
}

interface HealthStatusFormProps {
  data: HealthStatusData;
  onChange: (updatedData: HealthStatusData) => void;
  error?: string;
}

const HealthStatusForm: React.FC<HealthStatusFormProps> = ({
  data,
  onChange,
  error
}) => {
  const handleInputChange = (field: keyof HealthStatusData, value: any) => { // eslint-disable-line
    onChange({ ...data, [field]: value });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Estado de Salud Inicial
      </Typography>

      {/* Estado de Salud */}
      <TextField
        required
        select
        label="Estado de Salud *"
        variant="outlined"
        size="small"
        fullWidth
        value={data.estadoSalud}
        onChange={(e) => handleInputChange("estadoSalud", e.target.value)}
        error={Boolean(error && error.includes("Estado de Salud"))}
      >
        <MenuItem value="">Selecciona</MenuItem>
        <MenuItem value="Bueno">Bueno</MenuItem>
        <MenuItem value="Regular">Regular</MenuItem>
        <MenuItem value="Crítico">Crítico</MenuItem>
      </TextField>

      {/* Notas de Salud */}
      <TextField
        label="Notas de Salud"
        variant="outlined"
        size="small"
        fullWidth
        multiline
        minRows={3}
        value={data.notasSalud}
        onChange={(e) => handleInputChange("notasSalud", e.target.value)}
      />

      {/* Error */}
      {error && (
        <FormHelperText error sx={{ ml: 1 }}>
          {error}
        </FormHelperText>
      )}
    </Box>
  );
};

export default HealthStatusForm;
