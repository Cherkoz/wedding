import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import { ThemeInit } from "../.flowbite-react/init";
import { ThemeProviderWrapper } from "./providers/theme-provider-wrapper";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Приглашение на свадьбу",
  description: "",
  openGraph: {
    title: 'Приглашение на свадьбу',
    description: '',
    images: [
      {
        url: `https://wedding-silk-ten.vercel.app/assets/images/og-image.jpg`,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Приглашение на свадьбу",
    description: "",
    images: ["https://wedding-silk-ten.vercel.app/assets/images/og-image-tg.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body
        className={`${cormorantGaramond.variable} antialiased`}
      >
        <ThemeProviderWrapper>
          {children}
        </ThemeProviderWrapper>
        <ThemeInit />
      </body>
    </html>
  );
}
