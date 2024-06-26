import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface PopupProps {
  message: string;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ message, onClose }) => {
  const controls = useAnimation();

  useEffect(() => {
    // When component mounts, start the animation
    controls.start({ opacity: 1, scale: 1 });
    
    // Set a timeout to close the popup after 2.5 seconds
    const timeout = setTimeout(() => {
      controls.start({ opacity: 0, scale: 0.5 });
      onClose();
    }, 2500);

    // Clean up the timeout if the component unmounts or onClose is triggered
    return () => clearTimeout(timeout);
  }, [controls, onClose]);

  return (
    <motion.div
      className="fixed left-4 top-4 flex items-end justify-start z-50"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={controls}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ type: 'spring', stiffness: 300 }}
      onClick={onClose} // Close popup on click anywhere
    >
      <motion.div
        className="bg-green-300 p-4 rounded shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-gray-800 text-lg font-semibold">{message}</p>
      </motion.div>
    </motion.div>
  );
};

export default Popup;

