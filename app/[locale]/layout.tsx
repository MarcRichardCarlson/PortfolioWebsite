import type { Metadata } from "next";
import AppProviders from "./providers";
import { AppLocale } from "./locales";
import "./globals.css";
import ThemeScript from "@/hooks/ThemeScript";

export const metadata: Metadata = {
  title: "Marc Carlson | Web Development, Redefined",
  description: "Marc Carlson - Portfolio Website",
};

export default function RootLayout({
  params,
  children,
}: Readonly<{
  params: { locale: AppLocale };
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/public/favicon/favicon.ico"></link>
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet"/>

        <ThemeScript />
      </head>
      <body>
        <AppProviders locale={params.locale}>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
