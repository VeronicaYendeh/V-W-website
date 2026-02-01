import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "../index.css";
import { Button, Question, useEmailData } from "../components";
import config from "../config/config";

function Quiz() {
  const imageFiles = import.meta.glob("../assets/gifs/*.gif");
  const { questions, gifConfig, progressBarColor, text } = config.quizPage;
  const getGifData = (score) => gifConfig.find((config) => config.check(score));
  const { emailData, setEmailData } = useEmailData();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [gifSrc, setGifSrc] = useState(null);
  const gifData = getGifData(score);
  useEffect(() => {
    const loadGif = async () => {
      if (gifData?.gifName) {
        const gifPath = `../assets/gifs/${gifData.gifName}`;
        if (imageFiles[gifPath]) {
          const gifModule = await imageFiles[gifPath]();
          setGifSrc(gifModule.default);
        }
      }
    };

    loadGif();
  }, [gifData]);
  const handleNext = () => {
    setCurrentQuestion((prev) => Math.min(prev + 1, questions.length));
  };

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  };
  const nextPage = () => {
    setEmailData((prev) => ({
      ...prev,
      score: score,
      totalQuestions: questions.length,
    }));
    navigate("/drawing");
  };
  const progress = (currentQuestion / questions.length) * 100;
  return (
    <div className="min-h-[100dvh] bg-black/20 flex flex-col p-4 md:p-6">
      <motion.div
        className="w-full max-w-md mx-auto space-y-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex justify-between items-center">
          <div className="text-sm font-medium text-white drop-shadow-md">
            {text.questionLabel}{" "}
            {Math.min(currentQuestion, questions.length - 1) + 1} /{" "}
            {questions.length}
          </div>
          <div className="text-sm font-medium text-white drop-shadow-md">
            {text.scoreLabel} {score} / {questions.length}
          </div>
        </div>
        <div className="relative h-2 rounded-full bg-gray-200">
          <motion.div
            className={`absolute left-0 top-0 h-full rounded-full`}
            style={{ backgroundColor: progressBarColor }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <AnimatePresence mode="wait">
          {currentQuestion < questions.length ? (
            <Question
              key={currentQuestion}
              question={questions[currentQuestion]}
              onNext={handleNext}
              onAnswer={handleAnswer}
            />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center justify-center min-h-[65vh] text-center space-y-4 p-3"
            >
              {gifSrc && (
                <img
                  src={gifSrc}
                  className={`${gifData.style} -z-10`}
                  config
                  alt="Quiz reaction gif"
                />
              )}

              <h2 className="w- text-2xl font-bold text-white drop-shadow-lg mt-12">
                {gifData.heading}
              </h2>

              <p className="text-lg text-white drop-shadow-md">
                {text.yourScoreLabel} {score} {text.ofLabel} {questions.length}
              </p>

              <Button onClick={nextPage} className="w-[70%]">
                {text.nextButtonText}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default Quiz;
