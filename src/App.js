import PlayingBoard from './Components/PlayingBoard';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Snake Game</h1>
      <PlayingBoard />
      <h2>Score:</h2>
    </div>
  );
}

export default App;