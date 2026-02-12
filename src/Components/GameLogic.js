import { useRef, useEffect, useState } from "react";
import './GameLogic.css';

function GameLogic() {
  const canvasRef = useRef(null);
  
  const gridSize = 40;
  const cellSize = 15;
  
  const [snake, setSnake] = useState([
    { x: 20, y: 20 },
    { x: 19, y: 20 },
    { x: 18, y: 20 }
  ]);
  
  const [direction, setDirection] = useState({ x: 1, y: 0 });


  useEffect(() => {
    const gameLoop = setInterval(() => {
      setSnake((prevSnake) => {
        const newHead = {
          x: prevSnake[0].x + direction.x,
          y: prevSnake[0].y + direction.y
        };
        
        // Add new head, remove tail
        return [newHead, ...prevSnake.slice(0, -1)];
      });
      //snake moves speed, lower = faster
    }, 150);
    
    return () => clearInterval(gameLoop); // Cleanup
  }, [direction]);

  // keyboard controls
  useEffect(() => {
    const handleKeyPress = (e) => {
      switch(e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
        case 'a': 
        case 'A':
          setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          setDirection({ x: 1, y: 0 });
          break;
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    
    ctx.clearRect(0, 0, 600, 600);
    
    ctx.strokeStyle = "#ddd";
    ctx.lineWidth = 1;
    
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
    
    ctx.fillStyle = "gold";
    snake.forEach((segment) => {
      ctx.fillRect(
        segment.x * cellSize,
        segment.y * cellSize,
        cellSize,
        cellSize
      );
    });
    
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, 600, 600);
  }, [snake]);

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

export default GameLogic;