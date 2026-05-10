import type { Metadata } from "next";
import { Fraunces, Geist } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["SOFT", "opsz"],
  display: "swap",
});

const geist = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Albatros · Web profesional, SEO local y chatbot IA en 7 días",
  description:
    "Agencia digital con plazos y precios públicos. Web + Google Maps + WhatsApp con IA. Auditoría gratis en 48 horas. Sin agencias eternas.",
  keywords: [
    "agencia digital",
    "sitio web profesional",
    "SEO local",
    "chatbot WhatsApp IA",
    "Google Maps negocio",
    "web en 7 días",
  ],
  openGraph: {
    title: "Albatros · Web profesional, SEO local y chatbot IA en 7 días",
    description:
      "Agencia digital con plazos y precios públicos. Web + Google Maps + WhatsApp con IA. Auditoría gratis en 48 horas.",
    locale: "es_MX",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${fraunces.variable} ${geist.variable} antialiased`}
    >
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
