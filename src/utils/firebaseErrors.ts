// firebaseErrors.ts
export function getFriendlyFirebaseError(errorMessage: string): string {
    // You can check for error codes in the error message or use error.code if available.
    if (errorMessage.includes("auth/invalid-credential")) {
      return "Credenciales inválidas. Por favor, verifica tus datos.";
    }
    if (errorMessage.includes("auth/email-already-in-use")) {
      return "El correo electrónico ya está en uso. Por favor, utiliza otro.";
    }
    if (errorMessage.includes("auth/user-not-found")) {
      return "No se encontró el usuario. Verifica el correo ingresado.";
    }
    if (errorMessage.includes("auth/wrong-password")) {
      return "La contraseña es incorrecta. Inténtalo nuevamente.";
    }
    // Add more cases as needed
  
    // Default fallback
    return "Ocurrió un error. Por favor, inténtalo de nuevo.";
  }
  