import { motion } from "framer-motion";
import React from "react";
import { twMerge } from "tailwind-merge";

const Button = ({ children, onClick, className }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={twMerge(
        "w-full mt-8 sm:mt-12 py-2 flex justify-center items-center bg-white/20 gap-2 backdrop-blur-sm text-white text-sm sm:text-base border border-white/50 rounded-lg",
        className
      )}
    >
      {children}
    </motion.button>
  );
};

export default Button;
