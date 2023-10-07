import "./App.css";
import GameInfo from "./components/GameInfo/GameInfo";
import ScoreBoard from "./components/ScoreBoard/ScoreBoard";
import GameWindow from "./components/GameWindow/GameWindow";
import { GameProvider } from "./context/GameProvider";

function App() {
    return (
        <GameProvider>
            <main>
                <ScoreBoard />
                <GameWindow />
                <GameInfo />
            </main>
        </GameProvider>
    );
}

export default App;
