import { useGameContext } from "../../context/GameProvider";
import CountryCard from "../CountryCard/CountryCard";
import Draggable from "../Draggable/Draggable";
import InvisibleCard from "../InvisibleCard/InvisibleCard";
import "./FlagRow.css";

export default function FlagRow() {
    const context = useGameContext();
    return (
        <ul className="flags">
            {context?.playerCards.map((country, index) =>
                country ? (
                    <Draggable data={country} key={index.toString()}>
                        <CountryCard
                            id={country.id}
                            name={
                                context?.gameSettings?.type !== "name"
                                    ? country.name
                                    : ""
                            }
                            flag={country.flagUrl}
                            key={index.toString()}
                        />
                    </Draggable>
                ) : (
                    <InvisibleCard key={index.toString()} />
                )
            )}
        </ul>
    );
}
