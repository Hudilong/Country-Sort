import "./SettingsButton.css";
import SettingsIcon from "../../assets/icons/settings.svg";

type Props = {
    onClick(): void;
};

export default function RemoveButton({ onClick }: Props) {
    return (
        <div className="settings-button" onClick={onClick}>
            <img src={SettingsIcon} className="settings-icon" />
        </div>
    );
}
