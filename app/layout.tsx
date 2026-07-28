import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import FloatingCart from "@/components/Cart/FloatingCart";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://krossava.com.ua";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Krossava — Купити брендові кросівки в Україні",
    template: "%s | Krossava",
  },

  description:
    "Інтернет-магазин Krossava. Nike, Adidas, New Balance, Salomon, HOKA, UGG та інші бренди. Кросівки за вигідними цінами з доставкою по всій Україні.",

  keywords: [
    "кросівки",
    "купити кросівки",
    "Nike",
    "Adidas",
    "New Balance",
    "Salomon",
    "HOKA",
    "UGG",
    "брендові кросівки",
    "спортивне взуття",
    "магазин кросівок",
    "Україна",
    "Кроссава",
    "Кросава",
    "Красава",
  ],

  authors: [
    {
      name: "Krossava",
    },
  ],

  creator: "Krossava",

  publisher: "Krossava",

  category: "shopping",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "uk_UA",
    url: siteUrl,
    siteName: "Krossava",
    title: "Krossava — Купити брендові кросівки",
    description:
      "Nike, Adidas, New Balance, Salomon, HOKA, UGG. Доставка по Україні.",

    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Krossava",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Krossava — Купити брендові кросівки",
    description:
      "Nike, Adidas, New Balance, Salomon, HOKA, UGG. Доставка по Україні.",
    images: ["/og-image.jpg"],
  },

  icons: {
    icon: [
      {
        url: "/favicon.ico",
      },
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
      {
        url: "/favicon-32x32.png",
        sizes: "32x32",
      },
      {
        url: "/favicon-16x16.png",
        sizes: "16x16",
      },
    ],

    apple: [
      {
        url: "/Logo.webp",
        sizes: "180x180",
      },
    ],

    shortcut: "/favicon.ico",
  },

  manifest: "/site.webmanifest",
};
const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Krossava",
  url: "https://krossava.com.ua",
  logo: "https://krossava.com.ua/Logo.webp",

  sameAs: ["https://instagram.com/kro.ssava"],

  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    areaServed: "UA",
    availableLanguage: ["uk", "ru"],
  },
};
const store = {
  "@context": "https://schema.org",
  "@type": "OnlineStore",
  name: "Krossava",
  url: "https://krossava.com.ua",
  image: "https://krossava.com.ua/og-image.jpg",
  logo: "https://krossava.com.ua/Logo.webp",

  acceptedPaymentMethod: ["Visa", "MasterCard"],
  areaServed: "UA",

  sameAs: ["https://instagram.com/kro.ssava"],
};
const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: "https://krossava.com.ua",
  name: "Krossava",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://krossava.com.ua/sneakers?search={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingCart />
        <Toaster position="top-center" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organization, website, store]),
          }}
        />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
  `}
        </Script>
      </body>
    </html>
  );
}
