import { FC, useRef } from "react";
import { useOutsideClick } from "../../hooks/use-outside-click";
import { Portal } from "../portal";
import { backdrop } from "./modal.css";

type Props = {
  onOutsideClick: () => void;
};

export const Modal: FC<Props> = (props) => {
  const contentRef = useRef<HTMLDivElement>(null);
  useOutsideClick(contentRef, props.onOutsideClick);

  return (
    <Portal>
      <div className={backdrop}>
        <div ref={contentRef}>{props.children}</div>
      </div>
    </Portal>
  );
};
