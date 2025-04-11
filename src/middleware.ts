// src/redux/middleware.ts (o en la raíz del proyecto si lo prefieres)
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;

    // Rutas que deseas proteger
    const protectedRoutes = ["/dashboard"];

    const { pathname } = request.nextUrl;

    // Si la ruta es protegida y no hay token, redirige a login
    if (protectedRoutes.some((route) => pathname.startsWith(route)) && !token) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    // Si hay token, podrías refrescarlo si es necesario o validarlo
    // Ejemplo de refresco (necesitarías firebase-admin o tu lógica)
    // ...

    return NextResponse.next();
}

// Define las rutas a las que se aplicará este middleware
export const config = {
    matcher: ["/dashboard/:path*"],
};
