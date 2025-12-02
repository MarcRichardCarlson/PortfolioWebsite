"use client";

import { useLiquidGlass } from "@/contexts/LiquidGlassContext";
import { motion } from "framer-motion";

const LiquidGlassBackground = () => {
  const { isLiquidGlassEnabled } = useLiquidGlass();

  return (
    <motion.div
      className={`fixed inset-0 z-[-1] transition-all duration-200 ease-in-out ${
        isLiquidGlassEnabled ? 'liquid-glass-bg' : ''
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {isLiquidGlassEnabled && (
        <>
          {/* Gradient overlay on top of body background image - reduced opacity */}
          <div className="absolute inset-0 bg-gradient-to-br from-true-blue/5 via-transparent to-custom-purple/5 dark:from-true-blue/8 dark:to-custom-purple/8" />
          
          {/* Abstract color splashes - reduced opacity for clarity */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,122,255,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_20%_20%,rgba(0,122,255,0.12),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(192,168,242,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_80%_30%,rgba(192,168,242,0.12),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_70%,rgba(213,95,40,0.08),transparent_50%)] dark:bg-[radial-gradient(circle_at_40%_70%,rgba(213,95,40,0.1),transparent_50%)]" />
          
          {/* Additional color accents - reduced opacity */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_50%,rgba(51,156,255,0.08),transparent_40%)] dark:bg-[radial-gradient(circle_at_10%_50%,rgba(51,156,255,0.1),transparent_40%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_60%,rgba(192,168,242,0.08),transparent_40%)] dark:bg-[radial-gradient(circle_at_90%_60%,rgba(192,168,242,0.1),transparent_40%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(213,95,40,0.06),transparent_40%)] dark:bg-[radial-gradient(circle_at_50%_20%,rgba(213,95,40,0.08),transparent_40%)]" />
          
          {/* Static gradient overlay - reduced opacity */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_60%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.08),transparent_60%)]" />
          
          {/* Subtle noise texture */}
          <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />
        </>
      )}
    </motion.div>
  );
};

export default LiquidGlassBackground; 