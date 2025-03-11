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
  title: "SALO: Smart Axolotl Logistics Operation",
  description:
    "SALO es una plataforma SaaS para la conservación y monitoreo de ajolotes (Ambystoma mexicanum). Centraliza datos de salud, reproducción y cuidado en centros de conservación y fomenta la colaboración entre instituciones.",
  keywords: [
    // Español
    "SALO",
    "ajolotes",
    "conservación",
    "monitorización",
    "plataforma SaaS",
    "salud de ajolotes",
    "reproducción",
    "cuidado de ajolotes",
    "centro de conservación",
    "conservación digital",
    "gestión de datos ambientales",
    "innovación en conservación",
    "tecnología para la conservación",
    "biodiversidad",
    "ecosistemas acuáticos",
    "sostenibilidad",
    "ODS 9",
    "ODS 14",
    "ODS 17",
    "inteligencia artificial en conservación",
    "machine learning en biología",
    "solución digital para la conservación",
    "datos en tiempo real",
    "monitorización ambiental",
    "preservación de especies",
    // Inglés
    "SALO",
    "axolotls",
    "axolotl conservation",
    "monitoring",
    "SaaS platform",
    "axolotl health",
    "reproduction",
    "wildlife conservation",
    "conservation center",
    "digital conservation",
    "environmental data management",
    "innovation in conservation",
    "technology for conservation",
    "biodiversity",
    "aquatic ecosystems",
    "sustainability",
    "SDG 9",
    "SDG 14",
    "SDG 17",
    "artificial intelligence in conservation",
    "machine learning in biology",
    "digital solution for conservation",
    "real time monitoring",
    "environmental monitoring",
    "species preservation",
  ],
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "SALO: Smart Axolotl Logistics Operation",
    description:
      "Descubre SALO, la plataforma SaaS para centralizar y analizar datos en la conservación de ajolotes.",
    url: "https://www.saloapp.com",
    siteName: "SALO",
    images: [
      {
        url: "https://www.saloapp.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SALO - Plataforma para la conservación de ajolotes",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SALO: Smart Axolotl Logistics Operation",
    description:
      "SALO es la solución SaaS para la conservación y monitoreo de ajolotes, facilitando la gestión y colaboración en centros de conservación.",
    site: "@tuTwitter",
    creator: "@tuTwitter",
    images: ["https://www.saloapp.com/twitter-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${inter.variable}`}>
        <Providers>
          {children}
          <ToastContainer position="top-right" autoClose={5000} />
        </Providers>
      </body>
    </html>
  );
}
