import { useState, useEffect } from "react";
import SelectionCard from "./SelectionCard";

const Question = ({ question, onNext, onAnswer }) => {
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [wrongAnswer, setWrongAnswer] = useState(null);
  useEffect(() => {
    if (selected) {
      setShowResult(true);
      const isCorrect = selected === question.correctAnswer;

      if (!isCorrect) {
        setWrongAnswer(question.correctAnswer);
      } else {
        setWrongAnswer(null);
      }

      const timer = setTimeout(() => {
        onAnswer(isCorrect);
        onNext();
        setSelected(null);
        setShowResult(false);
        setWrongAnswer(null);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [selected, question.correctAnswer, onAnswer, onNext]);

  return (
    <div className="flex flex-col text-left justify-center min-h-[75vh]">
      <div className="mb-6">
        <h1 className="text-2xl mb-1 font-semibold text-white drop-shadow-lg">
          {question.title}
        </h1>
        <p className="text-sm text-gray-200 drop-shadow-md">
          {question.description}
        </p>
      </div>

      <div className="space-y-3 w-full max-w-md">
        {question.options.map((option) => (
          <SelectionCard
            key={option.value}
            icon={option.icon}
            label={option.label}
            selected={selected === option.value}
            onClick={() => !showResult && setSelected(option.value)}
            isCorrect={option.value === question.correctAnswer}
            showResult={showResult}
          />
        ))}
      </div>
      {wrongAnswer && (
        <div className="absolute left-1/2 top-[90%] -translate-x-1/2 text-medium text-center ">
          <p className="text-red-400 font-semibold flex">
            Correct answer :{" "}
            {
              question.options.find(
                (opt) => opt.value === question.correctAnswer
              )?.label
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default Question;
