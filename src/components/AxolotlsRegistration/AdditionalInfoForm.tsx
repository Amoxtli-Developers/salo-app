import React from "react";
import { Box, TextField, Typography } from "@mui/material";

export interface AdditionalInfoData {
  observaciones: string;
}

interface AdditionalInfoFormProps {
  data: AdditionalInfoData;
  onChange: (updatedData: AdditionalInfoData) => void;
}

const AdditionalInfoForm: React.FC<AdditionalInfoFormProps> = ({
  data,
  onChange
}) => {
  const handleInputChange = (value: string) => {
    onChange({ observaciones: value });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Información Adicional (Opcional)
      </Typography>

      <TextField
        label="Observaciones Generales"
        variant="outlined"
        size="small"
        fullWidth
        multiline
        minRows={4}
        value={data.observaciones}
        onChange={(e) => handleInputChange(e.target.value)}
      />
    </Box>
  );
};

export default AdditionalInfoForm;
