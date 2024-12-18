import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface AnimateOnViewProps {
  children: React.ReactNode;
  direction?: "top" | "bottom" | "left" | "right";
  duration?: number; // Animation duration
  delay?: number; // Animation delay
}

const AnimateOnView: React.FC<AnimateOnViewProps> = ({
  children,
  direction, // Direction is optional
  duration = 0.3, // Default duration
  delay = 0, // Default delay
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true }); // Trigger only once when in view

  // Determine initial position if a direction is set
  const initialPosition = direction
    ? direction === "top"
      ? { y: -50 }
      : direction === "bottom"
      ? { y: 50 }
      : direction === "left"
      ? { x: -50 }
      : { x: 50 }
    : {}; // No position offset for default fade/scale

  const animationVariants = {
    hidden: { opacity: 0, scale: direction ? 1 : 0.8, ...initialPosition }, // Scale if no direction
    visible: {
      opacity: 1,
      scale: 1,
      x: 0, // Reset horizontal position
      y: 0, // Reset vertical position
      transition: {
        duration,
        delay,
        ease: "easeOut", // Smooth easing
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={animationVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
};

export default AnimateOnView;
