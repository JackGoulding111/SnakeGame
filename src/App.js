import { useRef, useEffect } from "react";

function App() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.strokeRect(100, 100, 300, 300);
    // x, y, width, height
  }, []);

  return <canvas ref={canvasRef} width={600} height={600} />;
}

export default App;
