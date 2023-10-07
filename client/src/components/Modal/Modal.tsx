import "./Modal.css";
import { ReactNode } from "react";

type Props = {
    isVisible?: boolean;
    children?: ReactNode;
};

export default function Modal({ isVisible, children }: Props) {
    return (
        <div className={isVisible ? "overlay" : "hidden"}>
            <div className="modal">{children}</div>;
        </div>
    );
}
