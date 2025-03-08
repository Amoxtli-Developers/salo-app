// src/app/actions/authActions.ts
import { auth } from "@/utils/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

export async function loginWithEmail(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential; // Return the full object!
  } catch (error: any) {
    throw new Error(error.message);
  }
}
