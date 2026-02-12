import { useRef, useEffect, useState } from "react";
import './GameLogic.css';

function GameLogic() {
  const canvasRef = useRef(null);
  
  const gridSize = 15; // amount of cells per row/column
  const cellSize = 600 / gridSize; // the amount of pixels per cell
  
  const [snake, setSnake] = useState([
    { x: 3, y: 0 },
    { x: 2, y: 0 },
    { x: 1, y: 0 }
  ]);
  
  const [direction, setDirection] = useState({ x: 1, y: 0 });
  

  const [food, setFood] = useState({
    x: Math.floor(Math.random() * gridSize),
    y: Math.floor(Math.random() * gridSize)
  });

  useEffect(() => {
    const gameLoop = setInterval(() => {
      setSnake((prevSnake) => {
        const newHead = {
          x: prevSnake[0].x + direction.x,
          y: prevSnake[0].y + direction.y
        };
        
        if (newHead.x === food.x && newHead.y === food.y) {
          setFood({
            x: Math.floor(Math.random() * gridSize),
            y: Math.floor(Math.random() * gridSize)
          });
          
          return [newHead, ...prevSnake];
        }
        
        return [newHead, ...prevSnake.slice(0, -1)];
      });
    }, 150);
    
    return () => clearInterval(gameLoop);
  }, [direction, food]);

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
    
    // Draw snake
    ctx.fillStyle = "gold";
    snake.forEach((segment) => {
      ctx.fillRect(
        segment.x * cellSize,
        segment.y * cellSize,
        cellSize,
        cellSize
      );
    });
    
    // Draw food
    ctx.fillStyle = "red";
    ctx.fillRect(
      food.x * cellSize,
      food.y * cellSize,
      cellSize,
      cellSize
    );
    
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, 600, 600);
  }, [snake, food]);

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