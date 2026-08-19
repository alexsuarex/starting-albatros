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
  metadataBase: new URL("https://www.albatrosia.com"),
  title: {
    default: "Albatros | Sitios web, SEO y automatización con IA",
    template: "%s | Albatros",
  },
  description:
    "Creamos sitios web de alto rendimiento, optimizamos tu presencia en Google y automatizamos la atención al cliente con IA.",
  keywords: [
    "diseño web profesional",
    "automatización con IA",
    "chatbot para WhatsApp",
    "SEO local",
    "Google Business Profile",
    "agencia digital",
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
    title: "Albatros Dev | Sitios web, SEO y automatización con IA",
    description:
      "Sitios web de alto rendimiento, presencia en Google y atención automatizada con IA para tu negocio.",
    url: "/",
    siteName: "Albatros Dev",
    locale: "es_MX",
    type: "website",
    images: [
      {
        url: "/albatros.png",
        width: 1024,
        height: 1024,
        alt: "Albatros Dev",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Albatros Dev | Sitios web, SEO y automatización con IA",
    description:
      "Sitios web de alto rendimiento, presencia en Google y atención automatizada con IA.",
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
      className={`${dmSans.variable} ${playfair.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
