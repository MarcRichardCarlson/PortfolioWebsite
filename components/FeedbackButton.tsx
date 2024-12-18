import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import FeedbackIcon from "../public/icons/PhChatCenteredText.svg";

const FeedbackButton = () => {
  const [isExpanded, setExpanded] = useState(false);

  return (
    <motion.div
      className={`z-50 bg-black-smooth text-white cursor-pointer overflow-hidden ${
        isExpanded ? "rounded-lg" : "rounded-full"
      } flex ${isExpanded ? "flex-col" : "items-center"}`}
      initial={{ height: "48px", width: "48px" }}
      animate={
        isExpanded
          ? { height: "300px", width: "350px" } // Expands upwards
          : { height: "48px", width: "48px" } // Default size
      }
      whileHover={
        !isExpanded
          ? { width: "150px" } // Expands to the left on hover
          : {}
      }
      transition={{ duration: 0.3, ease: "easeInOut" }}
      onClick={() => !isExpanded && setExpanded(true)}
    >

      {/* Text (only visible on hover) */}
      {!isExpanded && (
        <motion.span
          className="ml-2 whitespace-nowrap"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          Share Feedback
        </motion.span>
      )}
      
      {/* Icon */}
      <div
        className={`${
          isExpanded ? "hidden" : "flex"
        } items-center justify-center w-12 h-12 bg-black-smooth`}
      >
        <Image
          src={FeedbackIcon}
          alt="Feedback Icon"
          width={24}
          height={24}
          className="invert"
        />
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <motion.div
          className="p-4 w-full h-full flex flex-col justify-start bg-black-smooth text-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Close Button */}
          <button
            className="text-gray-500 self-end mb-2 hover:text-black"
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(false);
            }}
          >
            ✖
          </button>

          {/* Feedback Form */}
          <div className="text-center">
            <h2 className="text-lg font-semibold mb-4">How can I improve?</h2>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Message sent!"); // Placeholder for form submission logic
              }}
            >
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
              />
              <textarea
                placeholder="Your Message"
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-full hover:bg-blue-600 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default FeedbackButton;
