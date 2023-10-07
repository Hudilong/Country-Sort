import { useDroppable } from "@dnd-kit/core";
import { ReactNode } from "react";
import "./Droppable.css";

type Props = {
    id: number;
    disabled?: boolean;
    children: ReactNode;
    isOver?: () => boolean;
};

export default function Droppable({ id, disabled = false, children }: Props) {
    const { setNodeRef } = useDroppable({
        id,
        disabled,
    });

    return (
        <div className="droppable" ref={setNodeRef}>
            {children}
        </div>
    );
}
