import { useState, useRef } from "react";
import { Pencil, Eraser, Trash } from "lucide-react";
import { Canvas, useEmailData } from "../components";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import config from "../config/config";
function Drawing() {
  const { setEmailData } = useEmailData();
  const navigate = useNavigate();
  const [color, setColor] = useState("#000000");
  const [tool, setTool] = useState("pencil");
  const [drawings, setDrawings] = useState([]);
  const canvasRef = useRef(null);
  const [message, setMessage] = useState(config.drawingPage.messages[0]);
  const [loading, setLoading] = useState(false);

  const { messages, COLORS, text } = config.drawingPage;

  const clearCanvas = () => {
    if (canvasRef.current) {
      canvasRef.current.clearCanvas();
    }
  };

  const submitDrawing = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current.getCanvas();
      if (canvas) {
        const image = canvas.toDataURL("image/png");

        setDrawings((prev) => {
          const updatedDrawings = [...prev, image];

          if (updatedDrawings.length === messages.length) {
            setEmailData((prevData) => ({
              ...prevData,
              drawings: updatedDrawings,
            }));

            setMessage(text.finalText);

            setTimeout(() => {
              navigate("/letter");
              setMessage(messages[0]);
            }, 2000);

            return [];
          }

          setMessage(messages[updatedDrawings.length]);
          return updatedDrawings;
        });

        canvasRef.current.clearCanvas();
      }
    }
  };

  return (
    <div className="min-h-[100dvh] flex items-center justify-center ">
  <motion.div
    className="w-full max-w-md mx-auto"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.8 }}
  >
    <div className="w-full max-w-3xl h-[calc(100vh-10rem)] flex flex-col bg-white rounded-lg shadow-lg relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
          <div className="text-lg font-medium text-gray-700">
            {text.loading}
          </div>
        </div>
      )}

      <div className="p-3 border-b">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {COLORS.map((c) => (
              <button
                key={c}
                className={`w-6 h-6 rounded-full ${
                  color === c ? "ring-2 ring-offset-2 ring-black" : ""
                }`}
                style={{ backgroundColor: c }}
                onClick={() => setColor(c)}
              />
            ))}
          </div>
          <div className="text-sm font-medium">{message}</div>
        </div>
      </div>

      <div className="flex-grow relative bg-white">
        <Canvas ref={canvasRef} color={color} tool={tool} />
      </div>

      <div className="p-3 border-t bg-gray-50 flex justify-between items-center">
        <div className="flex gap-2">
          <button
            className={`p-2 rounded-md ${
              tool === "pencil"
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700 border border-gray-300"
            }`}
            onClick={() => setTool("pencil")}
          >
            <Pencil className="w-5 h-5" />
          </button>
          <button
            className={`p-2 rounded-md ${
              tool === "eraser"
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700 border border-gray-300"
            }`}
            onClick={() => setTool("eraser")}
          >
            <Eraser className="w-5 h-5" />
          </button>
          <button
            className="p-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            onClick={clearCanvas}
          >
            <Trash className="w-5 h-5" />
          </button>
        </div>
        <button
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          onClick={submitDrawing}
          disabled={loading}
        >
          {text.submitText}
        </button>
      </div>
    </div>
  </motion.div>
</div>
  );
}

export default Drawing;
