import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Sun from "../public/icons/TablerSunHigh.svg";
import Moon from "../public/icons/CarbonMoon.svg";

const DarkModeButton = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean | null>(null); // `null` means uninitialized

  useEffect(() => {
    // Check the current class on the <html> element to set the initial state
    const htmlElement = document.documentElement;
    if (htmlElement.classList.contains("dark")) {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode === null) return; // Prevent toggle if not initialized

    const newMode = !isDarkMode;
    setIsDarkMode(newMode);

    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  // Animation variants for Framer Motion
  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.2 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  // Show nothing while determining the initial theme
  if (isDarkMode === null) {
    return null;
  }

  return (
    <motion.button
      onClick={toggleDarkMode}
      className={`flex items-center justify-center h-12 w-12 p-2 rounded-full shadow-md transition-transform duration-200 ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-black"
      }`}
      aria-label="Toggle Dark Mode"
      variants={buttonVariants}
      initial="hidden"
      animate="visible"
    >
      {isDarkMode ? (
        <Image src={Sun} alt="Light Mode" className="h-6 w-6" />
      ) : (
        <Image src={Moon} alt="Dark Mode" className="h-6 w-6" />
      )}
    </motion.button>
  );
};

export default DarkModeButton;
