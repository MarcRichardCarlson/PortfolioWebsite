import type { Metadata } from "next";
import AppProviders from "./providers";
import { AppLocale } from "./locales";
import "./globals.css";
import ThemeScript from "@/hooks/ThemeScript";
import { orbitron, montserrat } from "../fonts";
import { LiquidGlassProvider } from "@/contexts/LiquidGlassContext";
import LiquidGlassBackground from "@/components/LiquidGlassBackground";

export const metadata: Metadata = {
  title: "Marc Carlson | Web Development, Redefined",
  description: "Marc Carlson - Portfolio Website",
};

interface Props {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  const appLocale = locale as AppLocale;

  return (
    <html lang={appLocale} className={`${orbitron.variable} ${montserrat.variable}`} suppressHydrationWarning>
      <head>
        <link rel="shortcut icon" href="/favicon.ico" />
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
      <body className="theme-background" suppressHydrationWarning>
        <AppProviders locale={appLocale}>
          <LiquidGlassProvider>
            <LiquidGlassBackground />
            {children}
          </LiquidGlassProvider>
        </AppProviders>
      </body>
    </html>
  );
}
