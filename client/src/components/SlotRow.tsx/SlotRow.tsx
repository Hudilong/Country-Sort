import "./SlotRow.css";
import CountryCard from "../CountryCard/CountryCard";
import Droppable from "../Droppable/Droppable";
import Slot from "../Slot/Slot";
import { useGameContext } from "../../context/GameProvider";

export default function SlotRow() {
    const context = useGameContext();

    return (
        <ul className="slots">
            {context?.playerAnswer.map((country, index) => (
                <Droppable
                    id={index}
                    disabled={country ? true : false}
                    key={index.toString()}
                >
                    {!country ? (
                        <Slot index={index + 1} key={index.toString()} />
                    ) : (
                        <CountryCard
                            id={country.id}
                            name={
                                context?.gameSettings?.type !== "alphabetical"
                                    ? country.name
                                    : ""
                            }
                            flag={country.flagUrl}
                            key={index.toString()}
                            sloted
                            onRemove={() => context.clearSlot(country.id)}
                        />
                    )}
                </Droppable>
            ))}
        </ul>
    );
}
