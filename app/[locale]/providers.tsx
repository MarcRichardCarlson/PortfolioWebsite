"use client";

import { createContext, useContext, type ReactNode } from "react";
import { AppLocale } from "./locales";
import { LiquidGlassProvider } from "@/contexts/LiquidGlassContext";

interface AppProvidersProps {
  locale: AppLocale;
  children: ReactNode;
}

const AppContext = createContext<{ locale: AppLocale }>({ locale: "sv" });
export const useAppContext = () => useContext(AppContext);

export default function AppProviders({ locale, children }: AppProvidersProps) {
  return (
    <AppContext.Provider value={{ locale }}>
      <LiquidGlassProvider>
        {children}
      </LiquidGlassProvider>
    </AppContext.Provider>
  );
}