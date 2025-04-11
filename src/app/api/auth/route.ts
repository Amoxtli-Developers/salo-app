// src/app/api/auth/route.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/utils/firebaseConfig"; 
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";

// Ejemplo de server action para Login
export async function POST(request: NextRequest) {
    try {
        const { action, email, password } = await request.json();

        if (action === "login") {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            const token = await userCredential.user.getIdToken();
            console.log(token);
            return NextResponse.json({
                ok: true,
                token,
                user: {
                    uid: userCredential.user.uid,
                    email: userCredential.user.email,
                },
            });
        }

        if (action === "register") {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const token = await userCredential.user.getIdToken();
            return NextResponse.json({
                ok: true,
                token,
                user: {
                    uid: userCredential.user.uid,
                    email: userCredential.user.email,
                },
            });
        }

        if (action === "logout") {
            await signOut(auth);
            return NextResponse.json({ ok: true, message: "Logout exitoso" });
        }

        if (action === "google") {
            const provider = new GoogleAuthProvider();
            const userCredential = await signInWithPopup(auth, provider);
            const token = await userCredential.user.getIdToken();
            return NextResponse.json({
                ok: true,
                token,
                user: {
                    uid: userCredential.user.uid,
                    email: userCredential.user.email,
                    displayName: userCredential.user.displayName,
                },
            });
        }

        // Si la acción no coincide con las definidas
        return NextResponse.json(
            { ok: false, message: "Acción no válida" },
            { status: 400 }
        );
    } catch (error: any) {
        console.error(error);
        return NextResponse.json(
            { ok: false, error: error.message },
            { status: 500 }
        );
    }
}
