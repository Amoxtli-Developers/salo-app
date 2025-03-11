"use client";

import React from "react";
import { Box, TextField, Button, MenuItem, Stack, Typography, Paper } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

interface SupportFormInputs {
  nombre: string;
  email: string;
  asunto: string;
  mensaje: string;
}

const asuntoOptions = [
  { value: "Problema Técnico", label: "Problema Técnico" },
  { value: "Consulta General", label: "Consulta General" },
  { value: "Sugerencia", label: "Sugerencia" },
];

const SupportForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<SupportFormInputs>({
    mode: "onChange",
    defaultValues: {
      nombre: "",
      email: "",
      asunto: "",
      mensaje: "",
    },
  });

  const onSubmit: SubmitHandler<SupportFormInputs> = (data) => { // eslint-disable-line
    // Here, you would send the data to your backend.
    toast.success("Tu solicitud de soporte ha sido enviada. ¡Gracias!");
    reset();
  };

  return (
    <Paper sx={{ p: 3 }} elevation={1}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={2}>
          <TextField
            label="Nombre Completo"
            variant="outlined"
            size="small"
            fullWidth
            {...register("nombre", { required: "Este campo es obligatorio" })}
            error={Boolean(errors.nombre)}
            helperText={errors.nombre?.message}
          />
          <TextField
            label="Correo Electrónico"
            variant="outlined"
            size="small"
            fullWidth
            type="email"
            {...register("email", {
              required: "Este campo es obligatorio",
              pattern: { value: /^\S+@\S+$/i, message: "Correo no válido" },
            })}
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
          />
          <TextField
            label="Asunto"
            select
            variant="outlined"
            size="small"
            fullWidth
            {...register("asunto", { required: "Este campo es obligatorio" })}
            error={Boolean(errors.asunto)}
            helperText={errors.asunto?.message}
          >
            {asuntoOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Mensaje Detallado"
            variant="outlined"
            size="small"
            fullWidth
            multiline
            minRows={4}
            {...register("mensaje", { required: "Este campo es obligatorio" })}
            error={Boolean(errors.mensaje)}
            helperText={errors.mensaje?.message}
          />
          <Typography variant="caption" color="text.secondary">
            Nuestro equipo responde en un plazo de 24-48 horas.
          </Typography>
          <Button type="submit" variant="contained" disabled={!isValid}>
            Enviar Solicitud
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
};

export default SupportForm;
