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

  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (gameOver) return; // Stop the game loop if game is over
    
    const gameLoop = setInterval(() => {
      setSnake((prevSnake) => {
        const newHead = {
          x: prevSnake[0].x + direction.x,
          y: prevSnake[0].y + direction.y
        };
        
        // Check for wall collision
        if (newHead.x < 0 || newHead.x >= gridSize || newHead.y < 0 || newHead.y >= gridSize) {
          setGameOver(true);
          return prevSnake; // Don't update snake position
        }
        
        // Check for self-collision (head hitting body)
        const hitSelf = prevSnake.some(segment => 
          segment.x === newHead.x && segment.y === newHead.y
        );
        if (hitSelf) {
          setGameOver(true);
          return prevSnake; // Don't update snake position
        }
        
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
  }, [direction, food, gameOver]);

  // keyboard controls
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameOver) return; // Don't accept controls if game is over
      
      switch(e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          // Can't move up if currently moving down
          if (direction.y !== 1) {
            setDirection({ x: 0, y: -1 });
          }
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          // Can't move down if currently moving up
          if (direction.y !== -1) {
            setDirection({ x: 0, y: 1 });
          }
          break;
        case 'ArrowLeft':
        case 'a': 
        case 'A':
          // Can't move left if currently moving right
          if (direction.x !== 1) {
            setDirection({ x: -1, y: 0 });
          }
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          // Can't move right if currently moving left
          if (direction.x !== -1) {
            setDirection({ x: 1, y: 0 });
          }
          break;
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameOver, direction]);

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
    snake.forEach((segment, index) => {
      // Head is green, body is gold
      ctx.fillStyle = index === 0 ? "green" : "gold";
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
    
    // Draw game over overlay
    if (gameOver) {
      ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
      ctx.fillRect(0, 0, 600, 600);
      
      ctx.fillStyle = "white";
      ctx.font = "48px Arial";
      ctx.textAlign = "center";
      ctx.fillText("Game Over!", 300, 280);
      
      ctx.font = "24px Arial";
      ctx.fillText("Press R to Restart", 300, 330);
    }
  }, [snake, food, gameOver]);

  // Restart game functionality
  useEffect(() => {
    const handleRestart = (e) => {
      if (e.key === 'r' || e.key === 'R') {
        setGameOver(false);
        setSnake([
          { x: 3, y: 0 },
          { x: 2, y: 0 },
          { x: 1, y: 0 }
        ]);
        setDirection({ x: 1, y: 0 });
        setFood({
          x: Math.floor(Math.random() * gridSize),
          y: Math.floor(Math.random() * gridSize)
        });
      }
    };
    
    window.addEventListener('keydown', handleRestart);
    return () => window.removeEventListener('keydown', handleRestart);
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

export default GameLogic;