import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface WheelMarqueeProps {
  items: React.ReactNode[];
}

const positions = [
  { top: '40%', transform: 'translateY(-50%) scale(1)', zIndex: 2 },
  { top: '10%', transform: 'translateY(-50%) scale(0.1)', zIndex: 1 },
  { top: '70%', transform: 'translateY(-50%) scale(0.8)', zIndex: 1 },
];

const WheelMarquee: React.FC<WheelMarqueeProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchTimeout, setTouchTimeout] = useState<number | null>(null);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 3500); // Change every 3.5 seconds

    return () => clearInterval(interval);
  }, [items.length, isPaused]);

  const getItemPosition = (index: number) => {
    const relativeIndex = (index - currentIndex + items.length) % items.length;
    if (relativeIndex === 0) return 0;
    if (relativeIndex === 1) return 1;
    if (relativeIndex === items.length - 1) return 2;
    return -1;
  };

  const handleMouseDown = () => {
    setTouchTimeout(
      window.setTimeout(() => {
        setIsPaused(true);
      }, 200)
    );
  };

  const handleMouseUp = () => {
    if (touchTimeout) {
      clearTimeout(touchTimeout);
      setTouchTimeout(null);
    }
    setIsPaused(false);
  };

  const handleTouchStart = () => {
    setTouchTimeout(
      window.setTimeout(() => {
        setIsPaused(true);
      }, 200)
    );
  };

  const handleTouchEnd = () => {
    if (touchTimeout) {
      clearTimeout(touchTimeout);
      setTouchTimeout(null);
    }
    setIsPaused(false);
  };

  return (
    <div
      className="relative h-80 w-full overflow-hidden"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {items.map((item, index) => {
        const position = getItemPosition(index);
        if (position === -1) return null;

        return (
          <motion.div
            key={`item-${index}`}
            className="absolute left-0 right-0 flex items-center justify-center h-16 text-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: position === 0 ? 1 : 0.5,
              scale: position === 0 ? 1 : 1,
              top: positions[position].top,
              zIndex: positions[position].zIndex,
              transition: { duration: 0.8, type: 'spring' },
            }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.5 } }}
          >
            <span className="text-lg cursor-pointer">{item}</span>
          </motion.div>
        );
      })}
    </div>
  );
};

export default WheelMarquee;
