import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface RevealOnScrollProps {
  children: React.ReactNode;
  direction?: "top" | "bottom" | "left" | "right";
  duration?: number; // Animation duration
  delay?: number; // Animation delay
}

const RevealOnScroll: React.FC<RevealOnScrollProps> = ({
  children,
  direction, // Direction is optional
  duration = 0.2, // Default duration - snappier (reduced from 0.3)
  delay = 0, // Default delay
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" }); // Trigger earlier for smoother feel

  // Determine initial position if a direction is set - reduced offsets for snappier feel
  const initialPosition = direction
    ? direction === "top"
      ? { y: -30 }
      : direction === "bottom"
        ? { y: 30 }
        : direction === "left"
          ? { x: -30 }
          : { x: 30 }
    : {}; // No position offset for default fade/scale

  const animationVariants = {
    hidden: { opacity: 0, scale: direction ? 1 : 0.95, ...initialPosition }, // Reduced scale for snappier feel
    visible: {
      opacity: 1,
      scale: 1,
      x: 0, // Reset horizontal position
      y: 0, // Reset vertical position
      transition: {
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1], // Custom cubic-bezier for snappier animation
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

export default RevealOnScroll;
