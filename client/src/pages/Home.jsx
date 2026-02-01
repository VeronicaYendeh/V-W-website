import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import config from "../config/config";

function Home() {
  const navigate = useNavigate();
  const { sentencePerSlide, slides } = config.homePage;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);

  const currentSlide = slides[currentIndex];

  const handleClick = () => {
    if (visibleCount < Math.min(sentencePerSlide, currentSlide.length)) {
      setVisibleCount(visibleCount + 1);
    } else if (currentIndex < slides.length - 1) {
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
        setVisibleCount(1);
      }, 500);
    } else {
      setTimeout(() => {
        navigate("/quiz");
      }, 500);
    }
  };

  return (
    <div
      className="flex flex-col min-h-[100dvh] bg-black/20 cursor-pointer w-full items-center justify-center overflow-clip"
      onClick={handleClick}
    >
      <div className="w-[90%] max-w-[400px] px-8">
        {currentSlide.slice(0, visibleCount).map((sentence, index) => (
          <motion.p
            key={`${currentIndex}-${index}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.8 }}
            className="text-3xl font-bold text-white drop-shadow-lg"
          >
            {sentence}
          </motion.p>
        ))}
      </div>
    </div>
  );
}

export default Home;
