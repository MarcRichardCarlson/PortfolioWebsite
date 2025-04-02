"use client"

import { useEffect } from "react";

const ThemeScript = () => {
  useEffect(() => {
    try {
      const theme = localStorage.getItem("theme");
      if (
        theme === "dark" ||
        (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches)
      ) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } catch (e) {
      console.error("Error applying theme:", e);
    }
  }, []);

  return null; // No visible output; logic is handled in useEffect.
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