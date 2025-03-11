"use client";

import React, { useEffect } from "react";
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

interface EditAlertFormInputs {
  tipo: string;
  prioridad: string;
  descripcion: string;
  fechaHora: string;
}

interface EditAlertDialogProps {
  open: boolean;
  onClose: () => void;
  alertData: AlertData;
  onUpdate: (updatedAlert: AlertData) => void;
}

const EditAlertDialog: React.FC<EditAlertDialogProps> = ({
  open,
  onClose,
  alertData,
  onUpdate,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm<EditAlertFormInputs>({
    mode: "onChange",
    defaultValues: {
      tipo: "",
      prioridad: "",
      descripcion: "",
      fechaHora: "",
    },
  });

  // Reset form when the dialog opens or alertData changes
  useEffect(() => {
    if (open) {
      reset({
        tipo: alertData.tipo,
        prioridad: alertData.prioridad,
        descripcion: alertData.descripcion,
        fechaHora: alertData.fechaHora,
      });
    }
  }, [alertData, open, reset]);

  const onSubmit: SubmitHandler<EditAlertFormInputs> = (data) => {
    const updatedAlert: AlertData = {
      ...alertData,
      tipo: data.tipo, // Must match one of the <MenuItem> values
      prioridad: data.prioridad as "Alta" | "Media" | "Baja",
      descripcion: data.descripcion,
      fechaHora: data.fechaHora,
    };
    onUpdate(updatedAlert);
    onClose();
    reset();
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleCancel} fullWidth maxWidth="sm">
      <DialogTitle>Editar Alerta</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Tipo de Alerta"
            select
            fullWidth
            size="small"
            value={watch("tipo")}
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
            value={watch("prioridad")}
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
        <Button
          variant="contained"
          onClick={handleSubmit(onSubmit)}
          disabled={!isValid}
        >
          Actualizar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditAlertDialog;
