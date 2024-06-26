"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface ContactButtonProps {
  onClick: () => void;
}

const ContactButton: React.FC<ContactButtonProps> = ({ onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, backgroundColor: '#4338ca' }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="font-semibold w-fit flex flex-row gap-2 items-center cursor-pointer bg-black rounded-lg shadow-xl text-white px-6 py-2 text-sm sm:text-base md:text-md"
      onClick={onClick}
    >
      <span>Send Message</span>
    </motion.div>
  );
}

export default ContactButton;
