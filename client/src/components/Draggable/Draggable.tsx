import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { ReactNode } from "react";
import "./Draggable.css";
import { CountryInfo } from "../../types";

type Props = {
    children: ReactNode;
    data: CountryInfo;
};

export default function Draggable({ children, data }: Props) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: data.id,
        data,
    });
    const style = {
        transform: CSS.Translate.toString(transform),
    };

    return (
        <div
            className="draggable"
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
        >
            {children}
        </div>
    );
}
