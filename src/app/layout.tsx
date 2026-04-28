import type { Metadata } from "next";
import { DM_Sans, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Albatros Dev — Agencia digital en La Paz, BCS",
  description:
    "Sitios web, Google Maps y chatbots con IA para negocios en La Paz y Los Cabos. Versión beta disponible.",
  keywords: [
    "agencia digital La Paz",
    "sitio web La Paz BCS",
    "chatbot WhatsApp México",
    "SEO local Baja California Sur",
  ],
  openGraph: {
    title: "Albatros Dev — Agencia digital en La Paz, BCS",
    description:
      "Sitios web, Google Maps y chatbots con IA para negocios locales.",
    locale: "es_MX",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${dmSans.variable} ${playfair.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
