import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ForwardBackwardButtonProps {
  direction: "forward" | "backward";
  onClick: () => void;
}

const ForwardBackwardButton: React.FC<ForwardBackwardButtonProps> = ({ direction, onClick }) => {
  const [rotation, setRotation] = useState(0); // Track cumulative rotation
  const [flyText, setFlyText] = useState(0); // Track accumulated time in the air
  const [showText, setShowText] = useState(false); // Show or hide original text
  const [isSpinning, setIsSpinning] = useState(false); // Track if spinning
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null); // Timer for 1-second interval with reset

  const handleClick = () => {
    // Clear any existing timer to add time on top of the ongoing second
    if (timer) {
      clearTimeout(timer);
    }
  
    setFlyText((prev) => prev + (direction === "forward" ? 10 : -10)); // Update accumulated time
    setShowText(true); // Show the original text in the air
    setIsSpinning(false); // Reset spinning flag
    onClick(); // Execute any external logic
  
    // Trigger the spin at 800ms
    const spinTimer = setTimeout(() => {
      setRotation((prevRotation) => prevRotation + (direction === "forward" ? 360 : -360)); // Spin the icon
      setIsSpinning(true); // Trigger spin
    }, 350);
  
    // Hide the text after 1000ms
    const textTimer = setTimeout(() => {
      setShowText(false); // Hide the original text
      setFlyText(0); // Reset accumulated time after spin
      setTimer(null); // Clear the timer reference
    }, 700);
  
    setTimer(textTimer); // Save the text timer reference
  };
  

  return (
    <div className="relative flex items-center justify-center">
      <button onClick={handleClick} className="relative rounded-full flex items-center justify-center">
        {/* Static "+10" or "-10" label */}
        <span className="absolute text-white text-xs font-bold pointer-events-none">
          {direction === "forward" ? "10" : "-10"}
        </span>
        {/* Spinning SVG */}
        <motion.span
          animate={{ rotate: isSpinning ? rotation : rotation }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="text-lg font-bold"
        >
          {direction === "forward" ? (
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="iconify iconify--ph h-12 w-12" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 256"><path fill="currentColor" d="M240 56v48a8 8 0 0 1-8 8h-48a8 8 0 0 1 0-16h27.4l-26.59-24.36l-.25-.24a80 80 0 1 0-1.67 114.78a8 8 0 0 1 11 11.63A95.44 95.44 0 0 1 128 224h-1.32a96 96 0 1 1 69.07-164L224 85.8V56a8 8 0 1 1 16 0"></path></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="iconify iconify--ph h-12 w-12" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 256"><path fill="currentColor" d="M224 128a96 96 0 0 1-94.71 96H128a95.38 95.38 0 0 1-65.9-26.2a8 8 0 0 1 11-11.63a80 80 0 1 0-1.67-114.78a3 3 0 0 1-.26.25L44.59 96H72a8 8 0 0 1 0 16H24a8 8 0 0 1-8-8V56a8 8 0 0 1 16 0v29.8L60.25 60A96 96 0 0 1 224 128"></path></svg>          
          )}
        </motion.span>

        {/* Flying Text */}
<AnimatePresence>
  {showText && (
    <motion.span
      key={flyText} // Trigger reanimation on flyText change
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: -40 }} // Fly-up with ease-out
      exit={{ opacity: 0, y: -40 }}
      transition={{
        y: { duration: 0.1, ease: "easeOut" }, // Keep y movement quick
        opacity: { duration: 0.7, ease: "easeOut" } // Slow fade-out effect
      }}
      className="absolute text-white text-xs font-bold"
    >
      {flyText > 0 ? `+${flyText}` : `${flyText}`} {/* Show accumulated time */}
    </motion.span>
  )}
</AnimatePresence>


      </button>
    </div>
  );
};

const App = () => {
  const handleForwardClick = () => {
    console.log("Forward by 10 seconds");
    // Add your logic for advancing by 10 seconds
  };

  const handleBackwardClick = () => {
    console.log("Backward by 10 seconds");
    // Add your logic for rewinding by 10 seconds
  };

  return (
    <div className="flex space-x-4">
      <ForwardBackwardButton direction="backward" onClick={handleBackwardClick} />
      <ForwardBackwardButton direction="forward" onClick={handleForwardClick} />
    </div>
  );
};

export default App;
