import { useEffect, useState } from "react";
import { useGameContext } from "../../context/GameProvider";
import ScoreItem from "../ScoreItem/ScoreItem";
import { GameType, Score, ServerScore } from "../../types";
import { Puff } from "react-loader-spinner";
import "./ScoreBoard.css";

export default function ScoreBoard() {
    const context = useGameContext();
    const [isLoading, setIsLoading] = useState(false);
    const [highScores, setHighscores] = useState<Score[] | undefined>(
        undefined
    );

    useEffect(() => {
        setIsLoading(true);
        context?.gameSettings !== undefined &&
            loadHighScores(context.gameSettings.type);
        setIsLoading(false);
    }, [context?.gameSettings, context?.gameState.isGameOngoing]);

    async function loadHighScores(gameType: GameType) {
        try {
            const response = await fetch(`http://localhost:3000/scores`);
            const data = await response.json();
            const serverScores = data.filter(
                (score: ServerScore) => score.game_type === gameType
            );
            const scores = serverScores.map((item: ServerScore) => {
                return {
                    ...item,
                    gameType: item.game_type,
                    date: item.date_played,
                };
            });
            setHighscores(scores);
        } catch (e) {
            console.log("error:", e);
        }
    }

    return (
        <section
            className={`score-board ${
                context?.gameState.isGameOngoing ? "" : " invisible"
            }`}
        >
            <h2>High Scores</h2>
            <h3>Sort Criteria: {context?.gameSettings?.type.toUpperCase()}</h3>
            {!isLoading ? (
                <ol id="list">
                    {highScores?.map((score, index) => (
                        <ScoreItem
                            position={index + 1}
                            score={score}
                            key={index.toString()}
                        />
                    ))}
                </ol>
            ) : (
                <div className="wrapper">
                    <Puff color="white" />
                </div>
            )}
        </section>
    );
}
