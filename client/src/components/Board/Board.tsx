import { DndContext } from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import SlotRow from "../SlotRow.tsx/SlotRow";
import FlagRow from "../FlagRow/FlagRow";
import "./Board.css";
import { useGameContext } from "../../context/GameProvider";
import AppButton from "../AppButton/AppButton";

export default function Board() {
    const context = useGameContext();
    return (
        <div id="board">
            <DndContext
                onDragEnd={context?.handleDragEnd}
                modifiers={[restrictToWindowEdges]}
            >
                <SlotRow />
                {context?.playerAnswer.includes(undefined) ? (
                    <FlagRow />
                ) : (
                    <div id="submit-container">
                        <AppButton label="Submit" onClick={context!.submit} />
                    </div>
                )}
            </DndContext>
            <AppButton label="Clear" onClick={context!.resetAnswer} />
        </div>
    );
}
