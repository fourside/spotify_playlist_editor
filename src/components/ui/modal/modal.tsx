import { FC, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { CloseIcon } from "../../icons";
import { backdrop, closeIcon, content } from "./modal.css";

type Props = {
  open: boolean;
  onClose: () => void;
};

export const Modal: FC<Props> = (props) => {
  const { onClose } = props;

  useEffect(() => {
    const handleKeyDownCapture = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDownCapture, true);
    return () => {
      document.removeEventListener("keydown", handleKeyDownCapture, true);
    };
  }, [onClose]);

  return (
    <Dialog.Root open={props.open}>
      <Dialog.Portal>
        <Dialog.Overlay className={backdrop} onClick={props.onClose} />
        <Dialog.Content className={content}>
          <Dialog.Close className={closeIcon} onClick={props.onClose}>
            <CloseIcon />
          </Dialog.Close>
          {props.children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
