import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import GoldenThread from "@/components/GoldenThread";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.unwiz.ai"),
  title: {
    default: "OZ Tech",
    template: "%s",
  },
  description:
    "Navigating the maze of digital innovation - Where technology meets creativity",
  icons: {
    icon: [{ url: "/ozlogo.png", type: "image/png" }],
    apple: "/ozlogo.png",
  },
  openGraph: {
    type: "website",
    siteName: "OZ Tech",
    locale: "en_US",
    images: [{ url: "/ozlogo.png", width: 512, height: 512 }],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "OZ Tech",
      url: "https://www.unwiz.ai",
      logo: "https://www.unwiz.ai/ozlogo.png",
      description:
        "Custom software and AI engineering. Unlimited projects, one flat fee, full code ownership.",
      foundingDate: "2024",
      numberOfEmployees: { "@type": "QuantitativeValue", value: 5 },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "OZ Tech",
      url: "https://www.unwiz.ai",
    },
  ];

  return (
    <html lang="en">
      <head>
        {jsonLd.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </head>
      <body
        className={`${syne.variable} ${dmSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <GoldenThread />
        {children}
      </body>
    </html>
  );
}
