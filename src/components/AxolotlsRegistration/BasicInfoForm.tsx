import React from "react";
import {
  Box,
  TextField,
  MenuItem,
  Typography
} from "@mui/material";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export interface BasicInfoData {
  code: string;
  name: string;
  birthDate: Date | null;
  sexo: string;
  registerDate: Date;
}

interface BasicInfoFormProps {
  data: BasicInfoData;
  onChange: (updatedData: BasicInfoData) => void;
  error?: string;
}

const BasicInfoForm: React.FC<BasicInfoFormProps> = ({ data, onChange, error }) => {

  const handleInputChange = (field: keyof BasicInfoData, value: any) => { // eslint-disable-line
    onChange({ ...data, [field]: value });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Información Básica
      </Typography>

      {/* Código / ID */}
      <TextField
        label="Código / ID"
        variant="outlined"
        size="small"
        fullWidth
        value={data.code}
        onChange={(e) => handleInputChange("code", e.target.value)}
        helperText="Puede ser autogenerado o ingresado manualmente"
        sx={{ mb: 1 }}
      />

      {/* Nombre o Etiqueta */}
      <TextField
        required
        label="Nombre o Etiqueta *"
        variant="outlined"
        size="small"
        fullWidth
        value={data.name}
        onChange={(e) => handleInputChange("name", e.target.value)}
        error={Boolean(error && error.includes("Nombre"))}
        sx={{ mb: 2 }}
      />

      {/* Fecha de Nacimiento (unified with a custom TextField input) */}
      <ReactDatePicker
        selected={data.birthDate}
        onChange={(date) => handleInputChange("birthDate", date)}
        maxDate={new Date()}
        // The label, required asterisk, and style are on the custom TextField
        customInput={
          <TextField
            required
            label="Fecha de Nacimiento *"
            variant="outlined"
            size="small"
            fullWidth
            error={Boolean(error && error.includes("Fecha de Nacimiento"))}
            sx={{ mb: 2 }}
          />
        }
      />

      {/* Sexo */}
      <TextField
        required
        select
        label="Sexo *"
        variant="outlined"
        size="small"
        fullWidth
        value={data.sexo}
        onChange={(e) => handleInputChange("sexo", e.target.value)}
        error={Boolean(error && error.includes("Sexo"))}
        sx={{ mb: 2 }}
      >
        <MenuItem value="">Selecciona</MenuItem>
        <MenuItem value="Masculino">Masculino</MenuItem>
        <MenuItem value="Femenino">Femenino</MenuItem>
      </TextField>

      {/* Fecha de Registro (no editable) */}
      <TextField
        label="Fecha de Registro"
        variant="outlined"
        size="small"
        fullWidth
        value={data.registerDate.toLocaleDateString()}
        InputProps={{ readOnly: true }}
        sx={{ mb: 2 }}
      />

      {/* Display error at the bottom if any */}
      {error && (
        <Typography variant="caption" color="error">
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default BasicInfoForm;
