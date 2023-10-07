import "./AppButton.css";

type Props = {
    label: string;
    onClick(name?: string): void;
    name?: string;
    style?: React.CSSProperties;
};

export default function AppButton({ label, onClick, name, style }: Props) {
    return (
        <button
            type="button"
            name={name}
            className="app-btn"
            onClick={name ? () => onClick(name) : () => onClick()}
            style={style}
        >
            {label}
        </button>
    );
}
