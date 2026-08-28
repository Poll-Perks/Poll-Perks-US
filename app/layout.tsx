import type { Metadata } from "next";
import Script from "next/script";
import { Libre_Caslon_Text, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const caslon = Libre_Caslon_Text({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-caslon",
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PollPerks",
  description: "Free local deals for anyone who shows up and votes — nationwide, county by county.",
};

// Only loads the AdSense script once NEXT_PUBLIC_ADSENSE_CLIENT_ID is
// set (in Vercel's environment variables) — i.e. once you actually
// have an approved AdSense account and a real publisher ID. Until
// then this renders nothing, and the site behaves exactly as before.
const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${caslon.variable} ${plexSans.variable} ${plexMono.variable}`}>
      <head>
        {adsenseClientId && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}
