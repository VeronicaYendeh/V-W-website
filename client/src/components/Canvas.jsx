import {
  useRef,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";

const Canvas = forwardRef(({ color, tool, onDraw }, ref) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const context = canvas.getContext("2d");
      context.scale(window.devicePixelRatio, window.devicePixelRatio);
      context.lineCap = "round";
      context.lineJoin = "round";
      context.lineWidth = 5;
      contextRef.current = context;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  const startDrawing = (nativeEvent) => {
    const { offsetX, offsetY } = nativeEvent.type.includes("mouse")
      ? nativeEvent
      : {
          offsetX:
            nativeEvent.touches[0].clientX -
            nativeEvent.currentTarget.getBoundingClientRect().left,
          offsetY:
            nativeEvent.touches[0].clientY -
            nativeEvent.currentTarget.getBoundingClientRect().top,
        };

    if (contextRef.current) {
      contextRef.current.beginPath();
      contextRef.current.moveTo(offsetX, offsetY);
      setIsDrawing(true);
    }
  };

  const draw = (nativeEvent) => {
    if (!isDrawing || !contextRef.current) return;

    const { offsetX, offsetY } = nativeEvent.type.includes("mouse")
      ? nativeEvent
      : {
          offsetX:
            nativeEvent.touches[0].clientX -
            nativeEvent.currentTarget.getBoundingClientRect().left,
          offsetY:
            nativeEvent.touches[0].clientY -
            nativeEvent.currentTarget.getBoundingClientRect().top,
        };

    contextRef.current.strokeStyle = tool === "eraser" ? "#FFFFFF" : color;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();

    if (onDraw) {
      onDraw({ x: offsetX, y: offsetY, color: contextRef.current.strokeStyle });
    }
  };

  const stopDrawing = () => {
    if (contextRef.current) {
      contextRef.current.closePath();
      setIsDrawing(false);
    }
  };

  // Expose the clearCanvas function to the parent
  useImperativeHandle(ref, () => ({
    clearCanvas: () => {
      if (contextRef.current && canvasRef.current) {
        contextRef.current.clearRect(
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
      }
    },
    getCanvas: () => canvasRef.current,
  }));

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full touch-none"
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
      onTouchStart={startDrawing}
      onTouchMove={draw}
      onTouchEnd={stopDrawing}
    />
  );
});

export default Canvas;
