import React, { createContext, useState, useContext, ReactNode } from 'react';

interface SelectedPackagesContextType {
  selectedPackages: string[];
  addPackage: (pkg: string) => void;
  removePackage: (pkg: string) => void;
  resetPackages: () => void; // Add resetPackages function to the context type
}

const SelectedPackagesContext = createContext<SelectedPackagesContextType | undefined>(undefined);

export const SelectedPackagesProvider = ({ children }: { children: ReactNode }) => {
  const [selectedPackages, setSelectedPackages] = useState<string[]>([]);

  const addPackage = (pkg: string) => {
    setSelectedPackages((prev) => {
      if (!prev.includes(pkg)) {
        return [...prev, pkg];
      }
      return prev;
    });
  };

  const removePackage = (pkg: string) => {
    setSelectedPackages((prev) => prev.filter(p => p !== pkg));
  };

  const resetPackages = () => {
    setSelectedPackages([]);
  };

  return (
    <SelectedPackagesContext.Provider value={{ selectedPackages, addPackage, removePackage, resetPackages }}>
      {children}
    </SelectedPackagesContext.Provider>
  );
};

export const useSelectedPackages = () => {
  const context = useContext(SelectedPackagesContext);
  if (context === undefined) {
    throw new Error('useSelectedPackages must be used within a SelectedPackagesProvider');
  }
  return context;
};
