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
  metadataBase: new URL("https://albatrosia.com"),
  title: {
    default: "Albatros dev · Web Premium, SEO Local e IA en 7 días",
    template: "%s | Albatros dev"
  },
  description:
    "Agencia de desarrollo web de alto rendimiento. Creamos ecosistemas digitales con IA y SEO local en 7 días. Precios y plazos públicos. Auditoría gratuita en 48h.",
  keywords: [
    "Albatros dev",
    "agencia desarrollo web",
    "sitio web premium",
    "SEO local México",
    "chatbot IA WhatsApp",
    "automatización de ventas IA",
    "desarrollo Next.js premium",
  ],
  authors: [{ name: "Albatros dev" }],
  creator: "Albatros dev",
  publisher: "Albatros dev",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Albatros dev · Web Premium, SEO Local e IA en 7 días",
    description:
      "Transformamos tu negocio con infraestructura digital autónoma. Web, SEO y Chatbots IA de alta conversión.",
    url: "https://albatrosia.com",
    siteName: "Albatros dev",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Albatros dev · Web Premium e IA",
    description: "Desarrollo web de alto rendimiento y automatización con IA en 7 días.",
    creator: "@albatrosdev",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico?v=2' },
      { url: '/favicon.png?v=2', type: 'image/png' },
    ],
    shortcut: '/favicon.png?v=2',
    apple: '/apple-icon.png?v=2',
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
      className={`${fraunces.variable} ${geist.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Albatros dev",
              "url": "https://albatrosia.com",
              "logo": "https://albatrosia.com/og-image.png",
              "description": "Agencia de desarrollo web premium y soluciones de IA.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "La Paz",
                "addressRegion": "Baja California Sur",
                "addressCountry": "MX"
              },
              "sameAs": [
                "https://www.instagram.com/albatrosdev",
                "https://wa.me/5216121670637"
              ]
            }),
          }}
        />
      </head>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
