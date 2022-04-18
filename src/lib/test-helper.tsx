import { fireEvent } from "@testing-library/react";
import { FC, PropsWithChildren, ReactNode } from "react";
import { SWRConfig } from "swr";

export function dragAndDrop(src: Element, dst: Element) {
  fireEvent.dragStart(src);
  fireEvent.dragEnter(dst);
  fireEvent.drop(dst);
  fireEvent.dragLeave(dst);
  fireEvent.dragEnd(src);
}

export const SwrNoCacheWrapper: FC<PropsWithChildren<{}>> = ({ children }) => {
  return <SWRConfig value={{ provider: () => new Map() }}>{children}</SWRConfig>;
};
