import { FC, useRef, PropsWithChildren } from "react";
import { createPortal } from "react-dom";

export const Portal: FC<PropsWithChildren<{}>> = (props) => {
  const elementRef = useRef<Element>(typeof document !== "undefined" ? document.querySelector("#portal-root") : null);

  return elementRef.current ? createPortal(props.children, elementRef.current) : null;
};
