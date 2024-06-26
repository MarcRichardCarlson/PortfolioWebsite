"use client";

import React from 'react';
import { motion } from 'framer-motion';

const CardButton: React.FC = () => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, backgroundColor: '#4338ca', color: 'white', borderColor: '#CBD5E0' }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="whitespace-nowrap font-bold w-fit flex flex-row gap-2 items-center cursor-pointer bg-neutral-200 border border-black rounded-lg shadow-xl text-black px-6 py-2 text-sm sm:text-base md:text-md"
    >
      <span>Go to page</span>
    </motion.div>
  );
}

export default CardButton;