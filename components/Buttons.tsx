import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  size: 'xl' | 'lg' | 'sm';
  variant: 'primary' | 'secondary' | 'success' | 'bento' | 'plan' | 'remove' | 'skip' | 'redo';
  children: React.ReactNode;
  onClick?: () => void;
}

const sizeClasses = {
  xl: 'h-11 min-w-[64px] px-4 text-lg',
  lg: 'h-9 min-w-[56px] px-3 text-base',
  sm: 'h-7 min-w-[48px] px-2 text-sm',
};

const variantClasses = {
  primary: 'max-w-24 bg-black hover:bg-indigo-700 text-white rounded-lg font-semibold shadow-xl text-sm sm:text-base md:text-md',
  secondary: 'bg-neutral-200 hover:bg-indigo-500 text-black border border-black hover:text-white rounded-lg font-bold shadow-xl text-sm sm:text-base md:text-md',
  success: 'bg-green-500 hover:bg-green-600 text-white rounded-lg font-bold shadow-xl text-sm sm:text-base md:text-md',
  bento: 'bg-indigo-700 text-white rounded-lg font-bold shadow-xl text-sm sm:text-base md:text-md',
  plan: 'bg-black-soil text-white rounded-md font-base shadow-xl text-sm sm:text-base md:text-md',
  remove: 'text-xs flex justify-center items-center text-red-500 font-semibold hover:text-red-700 text-xs',
  skip: 'max-w-24 text-black hover:text-neutral-500 underline underline-offset-2 font-semibold text-sm sm:text-base md:text-md',
  redo: 'flex justify-center items-center hover:bg-indigo-500 text-black border border-black hover:text-white rounded-full font-bold shadow-xl text-sm sm:text-base md:text-md'
};

const ResponsiveButton: React.FC<ButtonProps> = ({ size, variant, children, onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`min-w-fit whitespace-nowrap ${sizeClasses[size]} ${variantClasses[variant]}`}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};

export default ResponsiveButton;

/*Usage example*/

{/* 
<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 space-y-4">
    <ResponsiveButton size="xl" variant="primary">
    Extra Large Button
    </ResponsiveButton>
    <ResponsiveButton size="lg" variant="success">
    Large Button
    </ResponsiveButton>
    <ResponsiveButton size="sm" variant="secondary">
    Small Button
    </ResponsiveButton>
</div> 
*/}