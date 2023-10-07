import { Puff } from "react-loader-spinner";
import { useGameContext } from "../../context/GameProvider";
import AppButton from "../AppButton/AppButton";
import "./ScoreForm.css";
import { useState } from "react";

export default function ScoreForm() {
    const context = useGameContext();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        player: "",
        score: context?.gameState.score,
        game_type: context?.gameSettings?.type,
        difficulty: context?.gameSettings?.difficulty,
    });

    async function handleSubmit() {
        setIsLoading(true);
        console.log(formData);
        await postScore();
        setIsLoading(false);
        context?.newGame();
    }

    async function postScore() {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_SERVER_URL}/scores`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            console.log("New Score:", data);
        } catch (error) {
            console.error("Error posting score:", error);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <form className="score-form">
            <p className="score-text">Game Over!</p>
            <p className="score-text">
                You scored {context?.gameState.score} points
            </p>
            <p className="score-text">Enter your name to save your score:</p>
            <input
                id="input"
                type="text"
                name="player"
                maxLength={20}
                onChange={handleChange}
            />
            <div className="loader-wrapper">
                {isLoading ? (
                    <Puff color="white" />
                ) : (
                    <AppButton label="Submit" onClick={handleSubmit} />
                )}
            </div>
        </form>
    );
}
