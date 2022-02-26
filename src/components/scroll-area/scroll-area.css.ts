import { style } from "@vanilla-extract/css";
import { Colors } from "../../styles/colors.css";

export const root = style({
  width: "100%",
  height: "100%",
  overflow: "hidden",
});

export const viewPort = style({
  width: "100%",
  height: "100%",
  borderRadius: "inherit",
});

const SCROLLBAR_SIZE_PX = 10;

export const scrollBar = style({
  display: "flex",
  userSelect: "none",
  touchAction: "none",
  padding: 2,
  background: `${Colors.black20}`,
  transition: "background 160ms ease-out",
  selectors: {
    '&[data-orientation="vertical"]': { width: SCROLLBAR_SIZE_PX },
    '&[data-orientation="horizontal"]': {
      flexDirection: "column",
      height: SCROLLBAR_SIZE_PX,
    },
  },
});

export const thumb = style({
  flex: 1,
  background: `${Colors.black200}`,
  borderRadius: SCROLLBAR_SIZE_PX,
  position: "relative",
  "::before": {
    content: '""',
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    height: "100%",
    minWidth: 44,
    minHeight: 44,
  },
});

export const corner = style({
  backgroundColor: `${Colors.black50}`,
});
