import GameLogic from './Components/GameLogic';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Snake Game</h1>
      <GameLogic/>
      <h2>Score:</h2>
    </div>
  );
}

export default App;