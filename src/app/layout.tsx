import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geist = localFont({
  src: "../../node_modules/next/dist/next-devtools/server/font/geist-latin.woff2",
  variable: "--font-sans",
});

const geistMono = localFont({
  src: "../../node_modules/next/dist/next-devtools/server/font/geist-mono-latin.woff2",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.albatrosia.com"),
  title: {
    default: "Albatros IA | Agentes de IA para WhatsApp y Messenger",
    template: "%s | Albatros IA",
  },
  description:
    "Atiende clientes, captura prospectos y agenda citas automáticamente con agentes de IA para WhatsApp y Messenger.",
  keywords: [
    "agentes de IA para negocios",
    "automatización con IA",
    "chatbot para WhatsApp",
    "SEO local",
    "Google Business Profile",
    "automatización de citas",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Albatros IA | Agentes de IA para WhatsApp y Messenger",
    description:
      "Responde mensajes, captura prospectos y agenda citas automáticamente con agentes de IA entrenados para tu negocio.",
    url: "/",
    siteName: "Albatros IA",
    locale: "es_MX",
    type: "website",
    images: [
      {
        url: "/albatros.png",
        width: 1024,
        height: 1024,
        alt: "Albatros IA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Albatros IA | Agentes de IA para WhatsApp y Messenger",
    description:
      "Responde mensajes, captura prospectos y agenda citas automáticamente con agentes de IA.",
    images: ["/albatros.png"],
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
      className={`${geist.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
