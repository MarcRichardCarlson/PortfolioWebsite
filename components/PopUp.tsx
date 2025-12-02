import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

interface PopupProps {
  message: string;
  onClose: () => void;
  type: "success" | "fail";
}

const Popup: React.FC<PopupProps> = ({ message, onClose, type }) => {
  const controls = useAnimation();
  const progressControls = useAnimation();

  useEffect(() => {
    // Start animation for the popup visibility
    controls.start({ opacity: 1, scale: 1 });

    // Start animation for the loading bar
    progressControls.start({
      width: "0%",
      transition: { duration: 3, ease: "linear" },
    });

    // Set a timeout to close the popup after 3 seconds
    const timeout = setTimeout(() => {
      controls.start({ opacity: 0, scale: 0.5 });
      onClose();
    }, 3000);

    // Clean up the timeout if the component unmounts or onClose is triggered
    return () => clearTimeout(timeout);
  }, [controls, progressControls, onClose]);

  // Determine styles based on the type
  const icon = type === "success" ? "✓" : "✗";
  const textColor = "text-white";

  return (
    <motion.div
      className="fixed right-2 bottom-2 md:right-8 md:bottom-8 flex items-end justify-start z-50"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={controls}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      onClick={onClose}
    >
      <motion.div
        className="relative bg-black p-6 rounded-lg shadow-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Progress bar at the top */}
        <motion.div
          className="absolute top-0 left-0 h-1 bg-white"
          initial={{ width: "100%" }}
          animate={progressControls}
        />

        <div className="flex items-center gap-2">
          <span className={`text-lg font-bold ${textColor}`}>{icon}</span>
          <p className={`text-sm md:text-base font-semibold ${textColor}`}>
            {message}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Popup;
