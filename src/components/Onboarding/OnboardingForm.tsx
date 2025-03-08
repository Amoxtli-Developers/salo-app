"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
    Grid,
    Box,
    Typography,
    Button,
    Paper,
    TextField,
    IconButton,
    Tooltip,
    Link,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent,
} from "@mui/material";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { ArrowForward, InfoOutlined } from "@mui/icons-material";
import completeLogo from "@/assets/logos/color-logo.svg";

interface OnboardingFormData {
    // Step 1: Datos Personales e Institucionales
    fullName: string;
    role: string;
    personalPhone?: string;
    organizationEmail?: string;
    website?: string;

    // Step 2: Dirección
    streetAddress: string;
    country: string;
    postalCode: string;
    delegation: string;
    neighborhood: string;

    // Step 3: Información del Refugio / Centro de Conservación
    centerName: string;
    yearsOfService: string;
    estimatedCount: string;
    infrastructure?: string;
    operationType: string;

    // Step 4: Preferencias de Notificaciones y Alertas
    alertFrequency: string;
    notificationMethod: string;
}

// Helper component: LabeledField with tooltip.
interface LabeledFieldProps {
    label: string;
    tooltip: string;
    error?: boolean;
    helperText?: string;
    [key: string]: any;
}

const LabeledField: React.FC<LabeledFieldProps> = ({ label, tooltip, error, helperText, ...props }) => (
    <Box sx={{ mt: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
            <Typography variant="caption" sx={{ ml: 1 }}>
                {label}
            </Typography>
            <Tooltip title={tooltip} placement="right">
                <IconButton size="small" sx={{ ml: 0.5 }}>
                    <InfoOutlined fontSize="small" />
                </IconButton>
            </Tooltip>
        </Box>
        <TextField fullWidth {...props} error={error} helperText={helperText} />
    </Box>
);

// Helper component: LabeledSelect with tooltip.
interface LabeledSelectProps {
    label: string;
    tooltip: string;
    value: string;
    onChange: (event: SelectChangeEvent<string>) => void;
    error?: boolean;
    helperText?: string;
    options: { value: string; label: string }[];
}

const LabeledSelect: React.FC<LabeledSelectProps> = ({
    label,
    tooltip,
    value,
    onChange,
    error,
    helperText,
    options,
}) => (
    <Box sx={{ mt: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
            <Typography variant="caption" sx={{ ml: 1 }}>
                {label}
            </Typography>
            <Tooltip title={tooltip} placement="right">
                <IconButton size="small" sx={{ ml: 0.5 }}>
                    <InfoOutlined fontSize="small" />
                </IconButton>
            </Tooltip>
        </Box>
        <FormControl fullWidth error={error}>
            <Select
                value={value}
                onChange={(event) => onChange(event as SelectChangeEvent<string>)}
                size="small"
                sx={{
                    height: 50,
                    "& .MuiSelect-select": { display: "flex", alignItems: "center" },
                }}
            >
                {options.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>
                        {opt.label}
                    </MenuItem>
                ))}
            </Select>
            {helperText && (
                <Typography variant="caption" color="error">
                    {helperText}
                </Typography>
            )}
        </FormControl>
    </Box>
);

export default function OnboardingForm() {
    const [step, setStep] = useState(1);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        setValue,
        watch,
    } = useForm<OnboardingFormData>({
        defaultValues: {
            fullName: "",
            role: "",
            personalPhone: "",
            organizationEmail: "",
            website: "",
            centerName: "",
            streetAddress: "",
            country: "",
            postalCode: "",
            delegation: "",
            neighborhood: "",
            yearsOfService: "",
            estimatedCount: "",
            infrastructure: "",
            operationType: "",
            alertFrequency: "",
            notificationMethod: "",
        },
    });

    const onSubmit: SubmitHandler<OnboardingFormData> = (data) => {
        if (step < 4) {
            setStep((prev) => prev + 1);
        } else {
            console.log("Onboarding Data:", data);
        }
    };

    // Options for select fields
    const countryOptions = [
        { value: "mx", label: "México" },
        { value: "us", label: "Estados Unidos" },
        { value: "other", label: "Otro" },
    ];

    const yearsOptions = [
        { value: "1", label: "1 año" },
        { value: "2", label: "2 años" },
        { value: "3", label: "3 años" },
        { value: "4", label: "4 años" },
        { value: "5+", label: "5+ años" },
    ];

    const estimatedOptions = [
        { value: "0-10", label: "0-10 ejemplares" },
        { value: "10-20", label: "10-20 ejemplares" },
        { value: "20-50", label: "20-50 ejemplares" },
        { value: "50+", label: "50+ ejemplares" },
    ];

    const operationOptions = [
        { value: "investigacion", label: "Investigación" },
        { value: "rescate", label: "Rescate y Crianza" },
        { value: "exhibicion", label: "Exhibición" },
        { value: "otro", label: "Otro" },
    ];

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <>
                        <Typography variant="h5" gutterBottom>
                            Paso 1: Datos Personales e Institucionales
                        </Typography>
                        <LabeledField
                            label="Nombre completo o razón social"
                            tooltip="Ingrese su nombre completo o el nombre de su organización"
                            {...register("fullName", {
                                required: "El nombre es obligatorio",
                                minLength: { value: 3, message: "Mínimo 3 caracteres" },
                            })}
                            error={!!errors.fullName}
                            helperText={errors.fullName?.message}
                        />
                        <LabeledField
                            label="Rol / Puesto"
                            tooltip="Ejemplo: Cuidador, Veterinario, Biólogo, etc."
                            {...register("role", {
                                required: "El rol es obligatorio",
                                minLength: { value: 2, message: "Mínimo 2 caracteres" },
                            })}
                            error={!!errors.role}
                            helperText={errors.role?.message}
                        />
                        <LabeledField
                            label="Teléfono (opcional)"
                            tooltip="Ingrese su número de teléfono, si lo desea"
                            {...register("personalPhone")}
                        />
                        <LabeledField
                            label="Correo de la organización (opcional)"
                            tooltip="Si su correo institucional es diferente, ingréselo aquí"
                            type="email"
                            {...register("organizationEmail")}
                        />
                        <LabeledField
                            label="Página web (opcional)"
                            tooltip="Si su organización tiene página web, ingrésela"
                            {...register("website")}
                        />
                    </>
                );
            case 2:
                return (
                    <>
                        <Typography variant="h5" gutterBottom>
                            Paso 2: Dirección
                        </Typography>
                        <LabeledField
                            label="Calle y número"
                            tooltip="Ingrese la calle y número"
                            {...register("streetAddress", {
                                required: "Este campo es obligatorio",
                                minLength: { value: 5, message: "Mínimo 5 caracteres" },
                            })}
                            error={!!errors.streetAddress}
                            helperText={errors.streetAddress?.message}
                        />
                        <Controller
                            name="country"
                            control={control}
                            rules={{ required: "El país es obligatorio" }}
                            render={({ field }) => (
                                <LabeledSelect
                                    label="País"
                                    tooltip="Seleccione el país"
                                    value={field.value}
                                    onChange={field.onChange}
                                    error={!!errors.country}
                                    helperText={errors.country?.message as string}
                                    options={countryOptions}
                                />
                            )}
                        />
                        <LabeledField
                            label="Código postal"
                            tooltip="Ingrese el código postal"
                            {...register("postalCode", {
                                required: "El código postal es obligatorio",
                                minLength: { value: 4, message: "Mínimo 4 caracteres" },
                            })}
                            error={!!errors.postalCode}
                            helperText={errors.postalCode?.message}
                        />
                        <LabeledField
                            label="Delegación"
                            tooltip="Ingrese la delegación o municipio"
                            {...register("delegation", {
                                required: "La delegación es obligatoria",
                                minLength: { value: 2, message: "Mínimo 2 caracteres" },
                            })}
                            error={!!errors.delegation}
                            helperText={errors.delegation?.message}
                        />
                        <LabeledField
                            label="Colonia"
                            tooltip="Ingrese la colonia"
                            {...register("neighborhood", {
                                required: "La colonia es obligatoria",
                                minLength: { value: 2, message: "Mínimo 2 caracteres" },
                            })}
                            error={!!errors.neighborhood}
                            helperText={errors.neighborhood?.message}
                        />
                    </>
                );
            case 3:
                return (
                    <>
                        <Typography variant="h5" gutterBottom>
                            Paso 3: Información del Refugio / Centro de Conservación
                        </Typography>
                        <LabeledField
                            label="Nombre del centro"
                            tooltip="Ingrese el nombre del refugio o centro de conservación"
                            {...register("centerName", {
                                required: "El nombre del centro es obligatorio",
                                minLength: { value: 3, message: "Mínimo 3 caracteres" },
                            })}
                            error={!!errors.centerName}
                            helperText={errors.centerName?.message}
                        />
                        <Controller
                            name="yearsOfService"
                            control={control}
                            rules={{ required: "Este campo es obligatorio" }}
                            render={({ field }) => (
                                <LabeledSelect
                                    label="Años de servicio"
                                    tooltip="Seleccione cuántos años lleva operando el refugio"
                                    value={field.value}
                                    onChange={field.onChange}
                                    error={!!errors.yearsOfService}
                                    helperText={errors.yearsOfService?.message as string}
                                    options={yearsOptions}
                                />
                            )}
                        />
                        <Controller
                            name="estimatedCount"
                            control={control}
                            rules={{ required: "Este campo es obligatorio" }}
                            render={({ field }) => (
                                <LabeledSelect
                                    label="Estimado de ejemplares protegidos"
                                    tooltip="Seleccione un rango estimado de ejemplares protegidos"
                                    value={field.value}
                                    onChange={field.onChange}
                                    error={!!errors.estimatedCount}
                                    helperText={errors.estimatedCount?.message as string}
                                    options={estimatedOptions}
                                />
                            )}
                        />
                        <LabeledField
                            label="Infraestructura disponible (opcional)"
                            tooltip="Describa la infraestructura disponible, si es relevante"
                            {...register("infrastructure")}
                        />
                        <Controller
                            name="operationType"
                            control={control}
                            rules={{ required: "El tipo de operación es obligatorio" }}
                            render={({ field }) => (
                                <LabeledSelect
                                    label="Tipo de operación"
                                    tooltip="Seleccione el tipo de operación (por ejemplo, Investigación, Rescate, Exhibición, Otro)"
                                    value={field.value}
                                    onChange={field.onChange}
                                    error={!!errors.operationType}
                                    helperText={errors.operationType?.message as string}
                                    options={operationOptions}
                                />
                            )}
                        />
                    </>
                );
            case 4:
                return (
                    <>
                        <Typography variant="h5" gutterBottom>
                            Paso 4: Preferencias de Notificaciones y Alertas
                        </Typography>
                        <LabeledField
                            label="Frecuencia de alertas"
                            tooltip="Ejemplo: Inmediatas, Diarias, Semanales"
                            {...register("alertFrequency", {
                                required: "La frecuencia es obligatoria",
                                minLength: { value: 3, message: "Mínimo 3 caracteres" },
                            })}
                            error={!!errors.alertFrequency}
                            helperText={errors.alertFrequency?.message}
                        />
                        <LabeledField
                            label="Medio de notificación"
                            tooltip="Ejemplo: Correo, SMS, Plataforma"
                            {...register("notificationMethod", {
                                required: "El medio de notificación es obligatorio",
                                minLength: { value: 3, message: "Mínimo 3 caracteres" },
                            })}
                            error={!!errors.notificationMethod}
                            helperText={errors.notificationMethod?.message}
                        />
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <Grid container component="main" sx={{ height: "100vh" }}>
            {/* Panel Izquierdo (BRANDING/TEXT) - Left side in reversed layout */}
            <Grid
                item
                xs={12}
                md={6}
                sx={{
                    backgroundImage: 'url("/images/left-panel-bg.jpg")',
                    backgroundRepeat: "no-repeat",
                    backgroundColor: (t) => t.palette.grey[900],
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#fff",
                    p: 4,
                }}
            >
                <Box sx={{ maxWidth: 700, textAlign: "left" }}>
                    <Box>
                        <Image src={completeLogo} alt="Logo SALO" width={200} height={120} />
                        <Typography
                            variant="h3"
                            gutterBottom
                            fontWeight="bold"
                            sx={{ mt: 2 }}
                        >
                            ¡Bienvenido a SALO!
                        </Typography>
                        <Typography variant="h6" paragraph fontWeight={300}>
                            Sigue estos sencillos pasos para configurar tu perfil y
                            optimizar la gestión de tu centro de conservación.
                            <br />
                            Podrás registrar datos personales, información del refugio,
                            y definir tus preferencias de notificaciones.
                        </Typography>
                    </Box>
                    <Typography variant="caption" display="block" sx={{ mt: 20 }}>
                        © 2025 SALO. Todos los derechos reservados. Powered by{" "}
                        <Link
                            href="https://www.amoxtli.tech"
                            underline="hover"
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{ color: "#fff" }}
                        >
                            AWD
                        </Link>
                    </Typography>
                </Box>
            </Grid>

            {/* Panel Derecho (FORM) - Right side in reversed layout */}
            <Grid
                item
                xs={12}
                md={6}
                component={Paper}
                elevation={6}
                square
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    p: 4,
                }}
            >
                <Box sx={{ maxWidth: 400, width: "100%", mx: "auto" }}>
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        {renderStepContent()}

                        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
                            {step > 1 && (
                                <Button variant="outlined" onClick={() => setStep((prev) => prev - 1)}>
                                    Atrás
                                </Button>
                            )}
                            <Button variant="contained" type="submit" endIcon={<ArrowForward />}>
                                {step < 4 ? "Siguiente" : "Finalizar"}
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Grid>
        </Grid>
    );
}
