"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Grid,
  Box,
  Typography,
  Link,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import GoogleIcon from "@mui/icons-material/Google";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoadingButton from "@mui/lab/LoadingButton";
import { useRouter } from "next/navigation";
import {
  UserCredential,
  sendEmailVerification,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { toast } from "react-toastify";
import { getFriendlyFirebaseError } from "@/utils/firebaseErrors";
import logo from "@/assets/logos/logo.svg";
import completeLogo from "@/assets/logos/color-logo.svg";
import { setPersistence, browserLocalPersistence } from "firebase/auth";

// Firebase & Redux imports
import { useDispatch, useSelector } from "react-redux";
import {
  authRequestStart,
  authRequestSuccess,
  authRequestFailure,
  setVerificationPending,
} from "@/features/authSlice";
import { loginWithEmail } from "@/app/actions/authActions";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, googleProvider } from "@/utils/firebaseConfig";

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
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);

  // Local state for the verification dialog and countdown
  const [verificationDialogOpen, setVerificationDialogOpen] = useState(false);
  const [countdown, setCountdown] = useState(10);

  const router = useRouter();
  const dispatch = useDispatch();
  const { verificationPending } = useSelector((state: any) => state.auth); // eslint-disable-line

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

  // Get current password value for confirmation validation
  const passwordValue = watch("password");

  // Countdown effect for verification dialog
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (verificationPending) {
      setVerificationDialogOpen(true);
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            handleCloseDialog();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [verificationPending]); // eslint-disable-line

  const handleCloseDialog = () => {
    setVerificationDialogOpen(false);
    dispatch(setVerificationPending(false));
    setIsSignUp(false); // Switch to sign-in form
    setCountdown(10);
  };

  // Function to handle password reset using Firebase
  const handleResetPassword = async () => {
    const emailValue = watch("email");
    if (!emailValue) {
      toast.error("Por favor, ingresa tu correo electrónico en el campo correspondiente.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, emailValue);
      toast.success("Se ha enviado un correo de restablecimiento a tu dirección.");
    } catch (err: any) { // eslint-disable-line
      const friendlyError = getFriendlyFirebaseError(err.message);
      toast.error(friendlyError);
      console.error("Reset password error:", err);
    }
  };

  // Submit handler for email/password registration or login
  const onSubmit: SubmitHandler<AuthFormInputs> = async (data) => {
    dispatch(authRequestStart());
    setLoadingEmail(true);

    try {
        await setPersistence(auth, browserLocalPersistence);
      let userCredential: UserCredential;
      if (isSignUp) {
        // Register new user
        userCredential = await createUserWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );
        // Send verification email
        await sendEmailVerification(userCredential.user);
        // Sign out so unverified users cannot access protected routes
        await signOut(auth);
        // Dispatch action to mark verification as pending
        dispatch(setVerificationPending(true));
        toast.info("Correo de verificación enviado. Revisa tu bandeja de entrada.");
      } else {
        // Normal login flow
        userCredential = await loginWithEmail(data.email, data.password);
        const token = await userCredential.user.getIdToken(true);
        document.cookie = `token=${token}; path=/;`;
        dispatch(
          authRequestSuccess({
            uid: userCredential.user.uid,
            email: userCredential.user.email || "",
            displayName: userCredential.user.displayName || "",
          })
        );
        router.replace("/dashboard");
      }
    } catch (err: any) { // eslint-disable-line
      const friendlyError = getFriendlyFirebaseError(err.message);
      dispatch(authRequestFailure(friendlyError));
      toast.error(friendlyError);
      console.error("Auth error:", err);
    } finally {
      setLoadingEmail(false);
    }
  };

  // Google Sign-In handler
  const handleGoogleSignIn = async () => {
    dispatch(authRequestStart());
    setLoadingGoogle(true);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const token = await user.getIdToken(true);
      document.cookie = `token=${token}; path=/;`;
      dispatch(
        authRequestSuccess({
          uid: user.uid,
          email: user.email || "",
          displayName: user.displayName || "",
          photoUrl: user.photoURL || "",
        })
      );
      router.push("/dashboard");
    } catch (error: any) { // eslint-disable-line
      dispatch(authRequestFailure(error.message));
      toast.error(error.message || "Error en inicio con Google");
      console.error("Google Sign-In error:", error);
    } finally {
      setLoadingGoogle(false);
    }
  };

  return (
    <>
      <Grid container component="main" sx={{ height: "100vh" }}>
        {/* Left Panel */}
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
              <Image src={logo} alt="Logo SALO" width={70} height={70} />
              <Typography variant="h2" gutterBottom fontWeight="bold" sx={{ mt: 2 }}>
                ¡Hola, bienvenido!
              </Typography>
              <Typography variant="h6" paragraph fontWeight={300}>
                Simplifica la gestión operativa de tu centro de conservación con alertas inteligentes y reportes estadísticos en tiempo real.
                <br />
                Centraliza tus datos y toma decisiones informadas para impulsar el cuidado eficiente de tus ajolotes.
              </Typography>
            </Box>
            <Typography variant="caption" display="block" sx={{ mt: 20 }}>
              © 2025 SALO. Todos los derechos reservados. Powered by{" "}
              <Link
                href="https://www.amoxtli.tech"
                underline="hover"
                target="_blank"
                rel="noopener noreferrer"
              >
                AWD
              </Link>
            </Typography>
          </Box>
        </Grid>

        {/* Right Panel */}
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
            <Image src={completeLogo} alt="Logo SALO" width={200} height={120} />

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

            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
              <LabelInputForm
                label="Correo electrónico"
                type="email"
                {...register("email", { required: "El correo electrónico es obligatorio" })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />

              <LabelInputForm
                label="Contraseña"
                {...register("password", { required: "La contraseña es obligatoria" })}
                error={!!errors.password}
                helperText={errors.password?.message}
                {...{
                  type: showPassword ? "text" : "password",
                  InputProps: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />

              {isSignUp && (
                <LabelInputForm
                  label="Confirmar Contraseña"
                  {...register("confirmPassword", {
                    required: "Por favor, confirma tu contraseña",
                    validate: (value) =>
                      value === passwordValue || "Las contraseñas no coinciden",
                  })}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                  {...{
                    type: showPassword ? "text" : "password",
                    InputProps: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              )}

              <LoadingButton
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                sx={{ mt: 4 }}
                loading={loadingEmail}
                loadingIndicator={<CircularProgress size={24} />}
              >
                {isSignUp ? "Regístrate" : "Inicia sesión"}
              </LoadingButton>
            </Box>

            <LoadingButton
              variant="outlined"
              color="inherit"
              fullWidth
              sx={{ mt: 2 }}
              onClick={handleGoogleSignIn}
              loading={loadingGoogle}
              loadingIndicator={<CircularProgress size={24} />}
              startIcon={<GoogleIcon sx={{ width: 20, height: 20 }} />}
            >
              Inicia sesión con Google
            </LoadingButton>

            {!isSignUp && (
              <Box sx={{ mt: 2 }}>
                <Link
                  href="#"
                  variant="body2"
                  underline="hover"
                  onClick={handleResetPassword}
                >
                  ¿Olvidaste tu contraseña? Haz clic aquí
                </Link>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>

      {/* Verification Dialog */}
      <Dialog open={verificationDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Verifica tu correo electrónico</DialogTitle>
        <DialogContent>
          <Typography>
            Te hemos enviado un correo de verificación. Por favor revisa tu bandeja de entrada.
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Serás redirigido a la pantalla de inicio de sesión en {countdown} segundos...
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} variant="contained" color="primary">
            Volver a Iniciar Sesión ({countdown})
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}