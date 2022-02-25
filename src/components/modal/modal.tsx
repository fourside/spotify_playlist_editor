import { FC, useRef } from "react";
import { useOutsideClick } from "../../hooks/use-outside-click";
import { CloseIcon } from "../icons";
import { Portal } from "../portal";
import { backdrop, closeIcon, content } from "./modal.css";

type Props = {
  onOutsideClick: () => void;
};

export const Modal: FC<Props> = (props) => {
  const contentRef = useRef<HTMLDivElement>(null);
  useOutsideClick(contentRef, props.onOutsideClick);

  return (
    <Portal>
      <div className={backdrop}>
        <div ref={contentRef} className={content}>
          <div className={closeIcon} onClick={props.onOutsideClick}>
            <CloseIcon />
          </div>
          {props.children}
        </div>
      </div>
    </Portal>
  );
};
