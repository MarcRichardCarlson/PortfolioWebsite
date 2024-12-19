import type { Metadata } from "next";
import AppProviders from "./providers";
import { AppLocale } from "./locales";
import "./globals.css";

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
        <link rel="shortcut icon" href="/favicon/favicon.ico"></link>
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet"/>

        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  const theme = localStorage.getItem('theme');
                  if (
                    theme === 'dark' ||
                    (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)
                  ) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {
                  console.error('Error applying theme:', e);
                }
              })();
            `,
          }}
        />
      </head>
      <body>
        <AppProviders locale={params.locale}>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
