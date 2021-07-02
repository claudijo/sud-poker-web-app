import './app.css';
import GameOfPoker from "./scenes/game-of-poker";

function App() {
    return (
        <GameOfPoker
            tableId="sandbox"
            size={{ width: 1280, height: 720 }}
        />
    );
}

export default App;
