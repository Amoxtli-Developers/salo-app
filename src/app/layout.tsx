// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "./providers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Your App Title",
  description: "Your app description",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable}`}>
        <Providers>
          {children}
          <ToastContainer position="top-right" autoClose={5000} />
        </Providers>
      </body>
    </html>
  );
}
