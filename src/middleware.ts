// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define protected routes
const protectedRoutes = ["/dashboard", "/some-other-protected-page"];

export function middleware(request: NextRequest) {
  // Check if the requested URL starts with any of your protected routes
  if (protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))) {
    // Suppose you store your token in cookies under "token"
    const token = request.cookies.get("token")?.value;

    if (!token) {
      // If no token, redirect to /login
      const url = request.nextUrl.clone();
      url.pathname = "/"; // or "/" if you prefer
      return NextResponse.redirect(url);
    }
  }

  // If token is present or the route is not protected, continue
  return NextResponse.next();
}

// Optionally, specify matcher if you only want the middleware to run on certain routes
export const config = {
  matcher: ["/dashboard/:path*", "/some-other-protected-page/:path*"],
};
