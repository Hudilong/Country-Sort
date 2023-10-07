import "./RemoveButton.css";
import RemoveIcon from "../../assets/icons/remove.svg";

type Props = {
    onClick(): void;
};

export default function RemoveButton({ onClick }: Props) {
    return (
        <div className="remove-button" onClick={onClick}>
            <img src={RemoveIcon} className="remove-icon" />
        </div>
    );
}
