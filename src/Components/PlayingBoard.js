import { useRef, useEffect } from "react";
import './PlayingBoard.css';

function PlayingBoard() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    
    const gridSize = 20; 
    const cellSize = 30; // px per cell
  
    ctx.strokeStyle = "#ddd"; 
    ctx.lineWidth = .5;

    for (let i = 0; i <= gridSize; i++) {
      ctx.beginPath();
      ctx.moveTo(i * cellSize, 0);
      ctx.lineTo(i * cellSize, 600);
      ctx.stroke();
    }

    for (let i = 0; i <= gridSize; i++) {
      ctx.beginPath();
      ctx.moveTo(0, i * cellSize);
      ctx.lineTo(600, i * cellSize);
      ctx.stroke();
    }

    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, 600, 600);
  }, []);

  return (
    <div className="playing-board-container">
      <canvas 
        ref={canvasRef} 
        width={600} 
        height={600}
        className="playing-board-canvas"
      />
    </div>
  );
}

export default PlayingBoard;