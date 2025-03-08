import { initializeApp } from "firebase/app";
import { getAuth, browserLocalPersistence, setPersistence, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  // Tus variables de entorno
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Establece la persistencia local
setPersistence(auth, browserLocalPersistence).catch((err) => {
  console.error("Error setting persistence", err);
});

const googleProvider = new GoogleAuthProvider();

export { app, auth, googleProvider };
