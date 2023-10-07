import { useGameContext } from "../../context/GameProvider";
import "./Header.css";

export default function Header() {
    const context = useGameContext();

    return (
        <div>
            <h1 id="game-title">Country Sort</h1>

            <h3
                id="score"
                className={context?.gameState.isGameOngoing ? "" : "invisible"}
            >
                Score: {context?.gameState.score}
            </h3>
            <h3
                id="tries"
                className={context?.gameState.isGameOngoing ? "" : "invisible"}
            >
                Tries Left: {context?.gameState.triesLeft}
            </h3>
            <h3
                id="round"
                className={context?.gameState.isGameOngoing ? "" : "invisible"}
            >
                Round: {context?.gameState.round}
            </h3>
            <h3
                id="timer"
                className={context?.gameState.isGameOngoing ? "" : "invisible"}
            >
                Time: {context?.gameState.roundTime}
            </h3>
        </div>
    );
}
