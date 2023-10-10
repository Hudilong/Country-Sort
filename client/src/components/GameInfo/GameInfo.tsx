import { useGameContext } from "../../context/GameProvider";
import AppButton from "../AppButton/AppButton";
import SettingsButton from "../SettingsButton/SettingsButton";
import "./GameInfo.css";

export default function GameSettings() {
    const context = useGameContext();

    return (
        <section
            className={`info ${
                context?.gameState.isGameOngoing ? "" : " invisible"
            }`}
        >
            <div className="title">
                <h2>Game Settings</h2>
                <SettingsButton
                    onClick={() =>
                        context!.updateGameState("isGameOngoing", false)
                    }
                />
            </div>

            <div>
                <p>Sort Criteria:</p>
                <p>{context?.gameSettings?.type.toUpperCase()}</p>
                <p>Difficulty:</p>
                <p>{context?.gameSettings?.difficulty.toUpperCase()}</p>
            </div>

            <AppButton label="New Game" onClick={context!.newGame} />
        </section>
    );
}
