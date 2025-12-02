"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface LiquidGlassContextType {
  isLiquidGlassEnabled: boolean;
  toggleLiquidGlass: () => void;
}

const LiquidGlassContext = createContext<LiquidGlassContextType | undefined>(undefined);

export const useLiquidGlass = () => {
  const context = useContext(LiquidGlassContext);
  if (!context) {
    throw new Error('useLiquidGlass must be used within a LiquidGlassProvider');
  }
  return context;
};

interface LiquidGlassProviderProps {
  children: ReactNode;
}

export const LiquidGlassProvider = ({ children }: LiquidGlassProviderProps) => {
  // Always enable liquid glass - dark/light mode controls which style is shown
  const [isLiquidGlassEnabled] = useState(true);

  const toggleLiquidGlass = () => {
    // No-op since liquid glass is always enabled
    // This function is kept for compatibility but does nothing
  };

  return (
    <LiquidGlassContext.Provider value={{ isLiquidGlassEnabled, toggleLiquidGlass }}>
      {children}
    </LiquidGlassContext.Provider>
  );
}; 