import { useState } from "react";
import { GameDifficulty, GameType } from "../../types";
import AppButton from "../AppButton/AppButton";
import { useGameContext } from "../../context/GameProvider";
import "./SettingsForm.css";

export default function SettingsForm() {
    const context = useGameContext();
    const [settings, setSettings] = useState(context?.gameSettings);

    function updateSettings(button: GameDifficulty | GameType) {
        if (button === "easy" || button === "medium" || button === "hard") {
            setSettings({
                ...settings!,
                difficulty: button,
            });
        } else if (
            button === "area" ||
            button === "population" ||
            button === "alphabetical"
        ) {
            setSettings({
                ...settings!,
                type: button,
            });
        }
    }

    function handleOkPressed() {
        context?.setGamesSettings(settings!);
        context?.newGame();
    }

    return (
        <form id="setting-form">
            <h1>Choose your settings</h1>
            <div className="btn-row">
                <AppButton
                    label="Easy"
                    onClick={() => updateSettings("easy")}
                    style={
                        settings?.difficulty === "easy"
                            ? { backgroundColor: "rgba(255, 255, 255, 0.1)" }
                            : {}
                    }
                />
                <AppButton
                    label="Medium"
                    onClick={() => updateSettings("medium")}
                    style={
                        settings?.difficulty === "medium"
                            ? { backgroundColor: "rgba(255, 255, 255, 0.1)" }
                            : {}
                    }
                />
                <AppButton
                    label="Hard"
                    onClick={() => updateSettings("hard")}
                    style={
                        settings?.difficulty === "hard"
                            ? { backgroundColor: "rgba(255, 255, 255, 0.1)" }
                            : {}
                    }
                />
            </div>
            <div className="btn-row">
                <AppButton
                    label="Area"
                    onClick={() => updateSettings("area")}
                    style={
                        settings?.type === "area"
                            ? { backgroundColor: "rgba(255, 255, 255, 0.1)" }
                            : {}
                    }
                />
                <AppButton
                    label="Population"
                    onClick={() => updateSettings("population")}
                    style={
                        settings?.type === "population"
                            ? { backgroundColor: "rgba(255, 255, 255, 0.1)" }
                            : {}
                    }
                />
                <AppButton
                    label="Alphabetical"
                    onClick={() => updateSettings("alphabetical")}
                    style={
                        settings?.type === "alphabetical"
                            ? { backgroundColor: "rgba(255, 255, 255, 0.1)" }
                            : {}
                    }
                />
            </div>
            <AppButton label="OK" onClick={handleOkPressed} />
        </form>
    );
}
