"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
    Grid,
    Box,
    Typography,
    Button,
    Link,
    Paper,
    TextField,
    InputAdornment,
    IconButton,
} from "@mui/material";
import { useForm } from "react-hook-form";
import GoogleIcon from "@mui/icons-material/Google";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import logo from "@/assets/logos/logo.svg";
import completeLogo from "@/assets/logos/color-logo.svg";

interface AuthFormInputs {
    email: string;
    password: string;
    confirmPassword?: string;
}

interface LabelInputFormProps extends React.ComponentProps<typeof TextField> {
    label: string;
}

function LabelInputForm({ label, ...props }: LabelInputFormProps) {
    return (
        <Box sx={{ mt: 2 }}>
            <Typography variant="caption" sx={{ ml: 1 }}>
                {label}
            </Typography>
            <TextField fullWidth {...props} />
        </Box>
    );
}

export default function AuthForm() {
    const [isSignUp, setIsSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<AuthFormInputs>({
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    // Vigila el campo de contraseña para la validación de confirmación
    const passwordValue = watch("password");

    const onSubmit = (data: AuthFormInputs) => {
        if (isSignUp) {
            // Reemplaza con la lógica/API para registrarse
            console.log("Datos de Registro:", data);
        } else {
            // Reemplaza con la lógica/API para iniciar sesión
            console.log("Datos de Inicio de Sesión:", data);
        }
    };

    const passwordFieldProps = {
        type: showPassword ? "text" : "password",
        InputProps: {
            endAdornment: (
                <InputAdornment position="end">
                    <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                    >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
            ),
        },
    };

    return (
        <Grid container component="main" sx={{ height: "100vh" }}>
            {/* Panel Izquierdo */}
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
                <Box
                    sx={{
                        maxWidth: 700,
                        textAlign: "left",
                    }}
                >
                    <Box>
                        {/* Logo encima del texto */}
                        <Image
                            src={logo}
                            alt="Logo SALO"
                            width={70}
                            height={70}
                        />
                        <Typography
                            variant="h2"
                            gutterBottom
                            fontWeight="bold"
                            sx={{ mt: 2 }}
                        >
                            ¡Hola, bienvenido!
                        </Typography>
                        <Typography variant="h6" paragraph fontWeight={300}>
                            Simplifica la gestión operativa de tu centro de
                            conservación con alertas inteligentes y reportes
                            estadísticos en tiempo real.
                            <br />
                            Centraliza tus datos y toma decisiones informadas
                            para impulsar el cuidado eficiente de tus ajolotes.
                        </Typography>
                    </Box>
                    <Typography
                        variant="caption"
                        display="block"
                        sx={{ mt: 20 }}
                    >
                        © 2025 SALO. Todos los derechos reservados. Powered by <Link href="https://www.amoxtli.tech" underline="hover" target='_blank' rel='noopener noreferrer'>AWD</Link>
                    </Typography>
                </Box>
            </Grid>

            {/* Panel Derecho */}
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
                <Box
                    sx={{
                        maxWidth: 400,
                        width: "100%",
                        mx: "auto",
                    }}
                >
                    {/* Branding */}
                    <Image
                        src={completeLogo}
                        alt="Logo SALO"
                        width={200}
                        height={120}
                    />

                    {/* Título y enlace para alternar */}
                    {isSignUp ? (
                        <>
                            <Typography variant="h5" gutterBottom>
                                Crear una Cuenta
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 3 }}>
                                ¿Ya tienes una cuenta?{" "}
                                <Link
                                    href="#"
                                    variant="body2"
                                    underline="hover"
                                    onClick={() => setIsSignUp(false)}
                                >
                                    Inicia sesión
                                </Link>
                            </Typography>
                        </>
                    ) : (
                        <>
                            <Typography variant="h5" gutterBottom>
                                ¡Bienvenido de nuevo!
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 3 }}>
                                ¿No tienes una cuenta?{" "}
                                <Link
                                    href="#"
                                    variant="body2"
                                    underline="hover"
                                    onClick={() => setIsSignUp(true)}
                                >
                                    Crea una
                                </Link>
                            </Typography>
                        </>
                    )}

                    {/* Formulario */}
                    <Box
                        component="form"
                        onSubmit={handleSubmit(onSubmit)}
                        noValidate
                    >
                        <LabelInputForm
                            label="Correo electrónico"
                            type="email"
                            {...register("email", {
                                required:
                                    "El correo electrónico es obligatorio",
                            })}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />

                        <LabelInputForm
                            label="Contraseña"
                            {...register("password", {
                                required: "La contraseña es obligatoria",
                            })}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                            {...passwordFieldProps}
                        />

                        {isSignUp && (
                            <LabelInputForm
                                label="Confirmar Contraseña"
                                {...register("confirmPassword", {
                                    required:
                                        "Por favor, confirma tu contraseña",
                                    validate: (value) =>
                                        value === passwordValue ||
                                        "Las contraseñas no coinciden",
                                })}
                                error={!!errors.confirmPassword}
                                helperText={errors.confirmPassword?.message}
                                {...passwordFieldProps}
                            />
                        )}

                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            fullWidth
                            sx={{ mt: 4 }}
                        >
                            {isSignUp ? "Regístrate" : "Inicia sesión"}
                        </Button>
                    </Box>

                    {/* Botón de inicio de sesión con Google */}
                    <Button
                        variant="outlined"
                        color="inherit"
                        fullWidth
                        sx={{ mt: 2 }}
                        // Agrega aquí tu lógica para el inicio de sesión con Google
                    >
                        <GoogleIcon sx={{ width: 20, height: 20, mr: 1 }} />
                        Inicia sesión con Google
                    </Button>

                    {/* Olvidé mi contraseña (solo para Iniciar Sesión) */}
                    {!isSignUp && (
                        <Box sx={{ mt: 2 }}>
                            <Link href="#" variant="body2" underline="hover">
                                ¿Olvidaste tu contraseña? Haz clic aquí
                            </Link>
                        </Box>
                    )}
                </Box>
            </Grid>
        </Grid>
    );
}
