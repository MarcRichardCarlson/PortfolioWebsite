import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
}

export const RevealOnScroll: React.FC<RevealOnScrollProps> = ({ children, className }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0, triggerOnce: true });

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  const variants = {
    hidden: { y: "10%", opacity: 0 },
    visible: { y: "0%", opacity: 1, transition: { duration: 0.2, ease: "easeOut" } },
  };

  return (
    <motion.div
      ref={ref}
      className={`overflow-hidden inline-block ${className}`}
      initial="hidden"
      animate={controls}
      variants={variants}
    >
      <motion.div>{children}</motion.div>
    </motion.div>
  );
};
