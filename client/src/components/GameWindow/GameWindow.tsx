import "./GameWindow.css";
import Header from "../Header/Header";
import Board from "../Board/Board";
import { useGameContext } from "../../context/GameProvider";
import SettingsForm from "../SettingsForm/SettingsForm";
import ScoreForm from "../ScoreForm/ScoreForm";
import { useEffect, useState } from "react";

export default function GameWindow() {
    const context = useGameContext();
    const [isRed, setIsRed] = useState(false);
    const [isGreen, setIsGreen] = useState(false);

    useEffect(() => {
        context?.gameState.isGameOngoing &&
            context.gameState.triesLeft !== 3 &&
            setIsRed(true);
        setTimeout(() => {
            setIsRed(false);
        }, 500);
    }, [context?.gameState.triesLeft]);

    useEffect(() => {
        context?.gameState.isGameOngoing &&
            context.gameState.score !== 0 &&
            setIsGreen(true);
        setTimeout(() => {
            setIsGreen(false);
        }, 500);
    }, [context?.gameState.score]);

    return (
        <section
            className={`game${isRed ? " red" : ""}${isGreen ? " green" : ""}`}
            // style={
            //     isRed
            //         ? {
            //               backgroundColor: "rgba(255, 0, 0, 0.2)",
            //           }
            //         : {}
            // }
        >
            <Header />
            {context?.gameState.isGameOngoing ? (
                <Board />
            ) : (
                <>
                    {context?.gameState.triesLeft !== 0 ? (
                        <SettingsForm />
                    ) : (
                        <ScoreForm />
                    )}
                </>
            )}
        </section>
    );
}
