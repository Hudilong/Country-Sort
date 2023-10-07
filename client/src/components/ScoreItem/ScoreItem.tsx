import { Score } from "../../types";
import "./ScoreItem.css";

type Props = {
    position: number;
    score: Score;
};

export default function ScoreItem({ position, score }: Props) {
    return (
        <li className="score-item">
            <div className="start">
                <p>{`${position.toString()}.`}</p>
                <p>{score.player}</p>
            </div>

            <p>{score.score.toString()}</p>
        </li>
    );
}
