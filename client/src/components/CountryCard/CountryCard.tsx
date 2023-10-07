import RemoveButton from "../RemoveButton/RemoveButton";
import "./CountryCard.css";

type Props = {
    id: number;
    name: string;
    flag: string;
    sloted?: boolean;
    onRemove?(id: number): void;
    style?: React.CSSProperties;
};

export default function CountryCard({
    id,
    name,
    flag,
    sloted = false,
    onRemove,
    style,
}: Props) {
    return (
        <div
            className={`country-card ${sloted ? "sloted" : null}`}
            style={style}
        >
            {sloted && onRemove && (
                <RemoveButton onClick={() => onRemove(id)} />
                // <button id="remove-btn" onClick={() => onRemove(id)}>
                //     X
                // </button>
            )}
            <img src={flag} />
            <p className="card-text">{name}</p>
        </div>
    );
}
