import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const texts = ['Frontend', 'Backend', 'Fullstack'];
const fallbackText = 'Fullstack'; // Fallback in case of failure

const TextSwitcher: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    let frameId: number;
    let timer: number;

    const switchText = () => {
      try {
        setIndex((prevIndex) => (prevIndex + 1) % texts.length);
        timer = window.setTimeout(() => {
          frameId = requestAnimationFrame(switchText);
        }, 6000); // Text switches every 6 seconds
      } catch (e) {
        console.error('Error switching text:', e);
        setError(true);
      }
    };

    frameId = requestAnimationFrame(switchText);

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(timer);
    };
  }, []);

  const variants = {
    initial: {
      opacity: 0,
      y: 10, // Start slightly below
    },
    animate: {
      opacity: 1,
      y: 0, // Slide into place
      transition: {
        duration: 0.3,
        ease: [0.42, 0, 0.58, 1], // Smooth cubic-bezier easing
      },
    },
    exit: {
      opacity: 0,
      y: -10, // Slide up slightly as it exits
      transition: {
        duration: 0.2,
        ease: [0.42, 0, 0.58, 1],
      },
    },
  };

  return (
    <div className="relative text-xl font-semibold text-white uppercase font-inter">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {error ? fallbackText : texts[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default TextSwitcher;
