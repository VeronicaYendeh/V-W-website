import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const SelectionCard = ({
  icon,
  label,
  selected,
  onClick,
  isCorrect,
  showResult,
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      disabled={showResult}
      className={`flex w-full items-center bg-white/20 gap-3 rounded-lg border p-4 text-left transition-colors ${
        selected && showResult && isCorrect
          ? "border-green-500 bg-green-300/20 backdrop-blur-lg text-green-200"
          : selected && showResult && !isCorrect
          ? "border-red-500 bg-red-300/20 backdrop-blur-lg text-red-200"
          : selected
          ? "border-blue-500 backdrop-blur-lg text-blue-700"
          : "border-white/50 backdrop-blur-lg text-white"
      }`}
    >
      {icon && (
        <div
          className={`${
            selected && showResult && isCorrect
              ? "bg-green-500 text-white"
              : selected && showResult && !isCorrect
              ? "bg-red-500 text-white"
              : selected
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          {icon}
        </div>
      )}
      <span className="flex-1 font-medium">{label}</span>
      {selected && showResult && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={`rounded-full p-1 text-white ${
            isCorrect ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {isCorrect ? (
            <Check className="h-4 w-4" />
          ) : (
            <X className="h-4 w-4" />
          )}
        </motion.div>
      )}
    </motion.button>
  );
};

export default SelectionCard;
