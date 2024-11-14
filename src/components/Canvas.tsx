import React, { useRef, useEffect, useState } from 'react';

type CanvasProps = {
  onSave: (imageData: string) => void;
};

function Canvas({ onSave }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    setContext(ctx);

    // Set white background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!context) return;
    
    setIsDrawing(true);
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    context.beginPath();
    context.moveTo(
      e.clientX - rect.left,
      e.clientY - rect.top
    );
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !context) return;
    
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    context.lineTo(
      e.clientX - rect.left,
      e.clientY - rect.top
    );
    context.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing || !context) return;
    
    setIsDrawing(false);
    context.closePath();
    
    // Save the canvas data
    const canvas = canvasRef.current;
    if (canvas) {
      onSave(canvas.toDataURL());
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas || !context) return;
    
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, canvas.width, canvas.height);
    onSave(canvas.toDataURL());
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="border-2 border-gray-300 rounded-lg cursor-crosshair bg-white"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
      <button
        onClick={clearCanvas}
        className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
      >
        クリア
      </button>
    </div>
  );
}

export default Canvas;