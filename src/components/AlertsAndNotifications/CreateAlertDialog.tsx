"use client";

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Stack,
} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { AlertData } from "@/components/AlertsAndNotifications/AlertCard";

interface CreateAlertFormInputs {
  tipo: string;
  prioridad: string;
  descripcion: string;
  fechaHora: string; // or a date object if you prefer
}

interface CreateAlertDialogProps {
  open: boolean;
  onClose: () => void;
  onCreate: (newAlert: AlertData) => void;
}

const CreateAlertDialog: React.FC<CreateAlertDialogProps> = ({
  open,
  onClose,
  onCreate,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<CreateAlertFormInputs>({
    mode: "onChange",
    defaultValues: {
      tipo: "",
      prioridad: "",
      descripcion: "",
      fechaHora: "",
    },
  });

  const onSubmit: SubmitHandler<CreateAlertFormInputs> = (data) => {
    const newAlert: AlertData = {
      id: Math.floor(Math.random() * 100000), // Or replace with a backend ID
      tipo: data.tipo,
      icon: data.tipo.toLowerCase(),
      prioridad: (data.prioridad as "Alta" | "Media" | "Baja") || "Baja",
      descripcion: data.descripcion,
      fechaHora: data.fechaHora,
      estado: "Pendiente", // default
    };

    onCreate(newAlert);
    onClose();
    reset();
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleCancel} fullWidth maxWidth="sm">
      <DialogTitle>Crear Nueva Alerta</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Tipo de Alerta"
            select
            fullWidth
            size="small"
            error={Boolean(errors.tipo)}
            helperText={errors.tipo && "Campo requerido"}
            {...register("tipo", { required: true })}
          >
            <MenuItem value="Vacunación">Vacunación</MenuItem>
            <MenuItem value="Revisión">Revisión</MenuItem>
            <MenuItem value="Tratamiento">Tratamiento</MenuItem>
            <MenuItem value="Evento Crítico">Evento Crítico</MenuItem>
          </TextField>

          <TextField
            label="Prioridad"
            select
            fullWidth
            size="small"
            error={Boolean(errors.prioridad)}
            helperText={errors.prioridad && "Campo requerido"}
            {...register("prioridad", { required: true })}
          >
            <MenuItem value="Alta">Alta</MenuItem>
            <MenuItem value="Media">Media</MenuItem>
            <MenuItem value="Baja">Baja</MenuItem>
          </TextField>

          <TextField
            label="Descripción Breve"
            fullWidth
            size="small"
            multiline
            minRows={2}
            error={Boolean(errors.descripcion)}
            helperText={errors.descripcion && "Campo requerido"}
            {...register("descripcion", { required: true })}
          />

          <TextField
            label="Fecha y Hora Programada"
            type="datetime-local"
            fullWidth
            size="small"
            error={Boolean(errors.fechaHora)}
            helperText={errors.fechaHora && "Campo requerido"}
            {...register("fechaHora", { required: true })}
            InputLabelProps={{ shrink: true }}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleCancel}>
          Cancelar
        </Button>
        <Button variant="contained" onClick={handleSubmit(onSubmit)} disabled={!isValid}>
          Crear
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateAlertDialog;
