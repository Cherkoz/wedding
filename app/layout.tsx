import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { ThemeInit } from "../.flowbite-react/init";
import { ThemeProviderWrapper } from "./providers/theme-provider-wrapper";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Приглашение на свадьбу",
  description: "",
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
