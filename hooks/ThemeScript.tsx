"use client"

import { useEffect } from "react";

const ThemeScript = () => {
  useEffect(() => {
    // Set initial theme based on localStorage or system preference
    const theme = localStorage.getItem('theme');
    
    // Always default to dark theme
    if (!theme) {
      localStorage.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');
    } else if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        if (e.matches) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return null;
};

export default ThemeScript;

/*
Preserves User Preference: If the user has explicitly selected a theme,
the script respects their choice by using localStorage.
Fallback to System Default: If no user preference exists, it adapts to 
the system's theme settings. Immediate Application: By applying the theme 
at the <html> level, it ensures the correct theme is loaded even before 
styles are fully applied. Minimal Performance Impact: The script runs once
 during page load, making it lightweight and efficient.
 */