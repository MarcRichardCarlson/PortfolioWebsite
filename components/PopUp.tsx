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
      transition: { duration: 2.5, ease: "linear" },
    });

    // Set a timeout to close the popup after 2.5 seconds
    const timeout = setTimeout(() => {
      controls.start({ opacity: 0, scale: 0.5 });
      onClose();
    }, 2500);

    // Clean up the timeout if the component unmounts or onClose is triggered
    return () => clearTimeout(timeout);
  }, [controls, progressControls, onClose]);

  // Determine styles based on the type
  const backgroundColor = type === "success" ? "bg-green-300" : "bg-red-300";
  const icon = type === "success" ? "✓" : "✗"; // Dynamic icon for success/fail
  const textColor = type === "success" ? "text-green-700" : "text-red-700";

  return (
    <motion.div
      className="fixed right-2 bottom-2 md:right-4 md:bottom-4 flex items-end justify-start z-50"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={controls}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ type: "spring", stiffness: 300 }}
      onClick={onClose} // Close popup on click anywhere
    >
      <motion.div
        className={`relative ${backgroundColor} p-2 md:p-4 rounded shadow-lg`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2">
          {/* Dynamic Icon */}
          <span className={`text-lg font-bold ${textColor}`}>{icon}</span>
          <p className={`text-sm md:text-base font-semibold ${textColor}`}>
            {message}
          </p>
        </div>

        {/* Dynamic loading bar */}
        <motion.div
          className={`${backgroundColor} h-2 absolute bottom-0 left-0 rounded-none md:rounded-bl-md`}
          initial={{ width: "100%" }}
          animate={progressControls}
        ></motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Popup;
