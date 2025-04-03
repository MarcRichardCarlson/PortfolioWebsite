import type { Metadata } from "next";
import AppProviders from "./providers";
import { AppLocale } from "./locales";
import "./globals.css";
import ThemeScript from "@/hooks/ThemeScript";
import { orbitron, montserrat } from "../fonts";

export const metadata: Metadata = {
  title: "Marc Carlson | Web Development, Redefined",
  description: "Marc Carlson - Portfolio Website",
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: AppLocale }>;
};

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  
  return (
    <html lang={locale} className={`${orbitron.variable} ${montserrat.variable}`}>
      <head>
        <link rel="shortcut icon" href="/public/favicon/favicon.ico"></link>
        <ThemeScript />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'light' || (!('theme' in localStorage) && !window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.remove('dark')
                } else {
                  document.documentElement.classList.add('dark')
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="theme-background">
        <AppProviders locale={locale}>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
