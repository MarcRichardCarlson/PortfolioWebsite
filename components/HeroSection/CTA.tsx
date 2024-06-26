"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from "@/i18n/client";
import { useCurrentLocale } from "@/hooks/locale";

interface CTAProps {
  onClick: () => void;
}

const CTA: React.FC<CTAProps> = ({ onClick }) => {
  const locale = useCurrentLocale();
  const { t } = useTranslation(locale, "translation");

  return (
    <motion.div
      whileHover={{ scale: 1.05, backgroundColor: '#4338ca'}}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="font-semibold w-fit flex flex-row gap-2 items-center cursor-pointer bg-black rounded-lg shadow-xl text-white px-6 py-2 text-sm sm:text-base md:text-md"
      onClick={onClick}
    >
      <span>{t("CTA")}</span>
    </motion.div>
  );
}

export default CTA;
