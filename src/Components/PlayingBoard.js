import { useRef, useEffect } from "react";
import './PlayingBoard.css';

function PlayingBoard() {
  const canvasRef = useRef(null);
  // const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
  
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, 1000, 600);
  }, []);

  return (
    <div className="playing-board-container">
      <canvas 
        ref={canvasRef} 
        width={1000} 
        height={600}
        className="playing-board-canvas"
      />
    </div>
  );
}

export default PlayingBoard;