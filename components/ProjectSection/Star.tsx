"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Popup from './PopUp';


interface StarProps {
  selected: boolean;
  onSelect: () => void;
}

const Star: React.FC<StarProps> = ({ selected, onSelect }) => (
  <motion.span
    className='cursor-pointer font-semibold text-xl'
    onClick={onSelect}
    whileHover={{ scale: 1.2, color: '#f0bb1a' }} // Scale up and change color on hover
    style={{ color: selected ? '#f0bb1a' : 'black' }} // Change color to yellow when selected
    transition={{ type: 'spring', stiffness: 300 }}
  >
    {selected ? '★' : '☆'}
  </motion.span>
);

const StarRating: React.FC = () => {
  const [rating, setRating] = useState<number>(0); // State to hold the current rating
  const [showPopup, setShowPopup] = useState<boolean>(false); // State to manage popup visibility

  const handleStarClick = (starIndex: number) => {
    setRating(starIndex + 1); // Increment by 1 to match your 1-5 scale
    setShowPopup(true); // Show popup when feedback is sent
    // Here you can send the rating data to your backend or save it locally
    console.log(`Selected rating: ${starIndex + 1}`);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div>
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          selected={index < rating}
          onSelect={() => handleStarClick(index)}
        />
      ))}
      {showPopup && (
        <Popup
          message="Feedback sent!"
          onClose={closePopup}
        />
      )}
    </div>
  );
};

export default StarRating;
