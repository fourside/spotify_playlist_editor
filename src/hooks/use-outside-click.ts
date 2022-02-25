import { RefObject, useEffect } from "react";

export function useOutsideClick<T extends HTMLElement>(
  targetRef: RefObject<T>,
  handler: (event: MouseEvent) => void
): void {
  useEffect(() => {
    const listener = (event: MouseEvent): void => {
      if (targetRef.current === null) {
        return;
      }
      if (event.target instanceof Node && targetRef.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("click", listener, true);
    return () => {
      document.removeEventListener("click", listener, true);
    };
  }, [handler, targetRef]);
}
