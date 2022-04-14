import { fireEvent } from "@testing-library/react";
import { FC } from "react";
import { SWRConfig } from "swr";

export function dragAndDrop(src: Element, dst: Element) {
  fireEvent.dragStart(src);
  fireEvent.dragEnter(dst);
  fireEvent.drop(dst);
  fireEvent.dragLeave(dst);
  fireEvent.dragEnd(src);
}

export const SwrNoCacheWrapper: FC = ({ children }) => {
  return <SWRConfig value={{ provider: () => new Map() }}>{children}</SWRConfig>;
};
