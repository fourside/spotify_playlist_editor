import { FC } from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { corner, root, scrollBar, thumb, viewPort } from "./scroll-area.css";

type Props = {
  children: React.ReactNode;
};

export const ScrollArea: FC<Props> = (props) => {
  return (
    <ScrollAreaPrimitive.Root className={root} type="auto">
      <ScrollAreaPrimitive.Viewport className={viewPort}>{props.children}</ScrollAreaPrimitive.Viewport>
      <ScrollAreaPrimitive.ScrollAreaScrollbar orientation="vertical" className={scrollBar}>
        <ScrollAreaPrimitive.Thumb className={thumb} />
      </ScrollAreaPrimitive.ScrollAreaScrollbar>
      <ScrollAreaPrimitive.ScrollAreaScrollbar orientation="horizontal" className={scrollBar}>
        <ScrollAreaPrimitive.Thumb className={thumb} />
      </ScrollAreaPrimitive.ScrollAreaScrollbar>
      <ScrollAreaPrimitive.Corner className={corner} />
    </ScrollAreaPrimitive.Root>
  );
};
