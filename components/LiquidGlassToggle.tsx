"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useLiquidGlass } from "@/contexts/LiquidGlassContext";
import Glass from "../public/icons/glass.png";

const LiquidGlassToggle = () => {
  const { isLiquidGlassEnabled, toggleLiquidGlass } = useLiquidGlass();

  return (
    <motion.button
      onClick={toggleLiquidGlass}
      className={`relative flex items-center justify-center h-12 w-12 p-2 rounded-full transition-all duration-200 ${
        isLiquidGlassEnabled 
          ? "bg-true-blue/20 dark:bg-true-blue/30 text-true-blue dark:text-true-blue-light" 
          : "bg-gray-200 dark:bg-gray-800 text-gray-600"
      }`}
      aria-label="Toggle Liquid Glass Effect"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute inset-0 rounded-full"
        
        transition={{ duration: 0.3 }}
      />
      <Image 
        src={Glass} 
        alt="Liquid Glass" 
        className={`h-6 w-6 transition-all duration-200 ${
          isLiquidGlassEnabled 
            ? "rotate-180" 
            : ""
        } dark:invert`}
      />
    </motion.button>
  );
};

export default LiquidGlassToggle; 