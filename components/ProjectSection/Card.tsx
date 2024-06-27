import React, { ReactNode } from "react";
import { StaticImageData } from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface CardProps {
  title: string;
  image: StaticImageData;
  children: ReactNode;
  showMore: boolean;
  onToggle: () => void;
  showMoreContent: string;
}

const Card: React.FC<CardProps> = ({
  title,
  image,
  children,
  showMore,
  onToggle,
  showMoreContent,
}) => {
  const imageUrl = image.src;

 
  return (
    <motion.div
      className="flex flex-col gap-2 relative cursor-pointer shadow-xl rounded-lg overflow-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-100 min-h-96 transform transition-transform hover:scale-105"
      onClick={onToggle}
      layout
      whileHover={{ scale: 1.05 }}
    >
      <AnimatePresence>
        {showMore ? (
          <motion.div
            key="expanded"
            className="flex flex-col justify-start items-left bg-white p-4 absolute inset-0 z-10 pb-2"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex flex-col gap-2 items-start">
              <h3 className="text-2xl font-bold">{title}</h3>
              <div className="font-inter flex flex-col gap-2 items-start pb-2">
                {/* Display showMoreContent here */}
                <p>{showMoreContent}</p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="collapsed"
            className="flex flex-col gap-0"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <motion.img
              src={imageUrl}
              alt={title}
              className="object-cover z-0 rounded-t-lg min-h-1/3 md:h-48 lg:h-64"
              layout
            />
            <motion.div
              className="flex flex-col justify-start items-left bg-white p-4 rounded-b-lg"
              layout
            >
              <div className="flex flex-col gap-2 items-start">
                <h3 className="text-2xl font-bold">{title}</h3>
                <p className="text-sm">{children}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Card;
