import "./Slot.css";
import { CSSProperties } from "react";

type Props = {
    index: number;
    style?: CSSProperties;
};

export default function Slot({ index, style }: Props) {
    return (
        <div className="slot" style={style}>
            <p id="slot-text">{index}</p>
        </div>
    );
}
