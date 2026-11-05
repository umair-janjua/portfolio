import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { PROFILE } from "@/data/portfolio";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://umairamjad.vercel.app"),
  title: "Umair Amjad | Senior Mobile Application Developer Portfolio",
  description: PROFILE.summary,
  keywords: [
    "Umair Amjad",
    "Senior Mobile Application Developer",
    "Senior Flutter Developer",
    "Flutter Developer Pakistan",
    "Offline-First Mobile Architecture",
    "PowerSync",
    "Clean Architecture Flutter",
    "Fintech Mobile Developer",
    "iOS Android Developer",
  ],
  authors: [{ name: PROFILE.name }],
  openGraph: {
    title: "Umair Amjad | Senior Mobile Application Developer",
    description: PROFILE.summary,
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PROFILE.name,
    jobTitle: PROFILE.role,
    email: PROFILE.email,
    telephone: PROFILE.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kamoke, Gujranwala",
      addressCountry: "PK",
    },
    sameAs: [PROFILE.linkedin, PROFILE.gitlab, PROFILE.github],
    description: PROFILE.summary,
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${playfair.variable} dark`}
    >
      <body className="min-h-screen bg-black font-sans text-zinc-100 antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}

