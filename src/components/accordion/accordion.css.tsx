import { keyframes, style } from "@vanilla-extract/css";
import { Colors } from "../../styles/colors.css";
import { NormalText } from "../../styles/fonts.css";

export const root = style({
  width: "100%",
  border: `1px solid ${Colors.black50}`,
  borderRadius: "4px",
});

export const item = style({
  overflow: "hidden",
  borderRadius: "4px",
});

export const header = style({
  margin: 0,
});

export const trigger = style([
  {
    padding: "8px",
    border: "none",
    borderRadius: "4px",
    fontFamily: "inherit",
    backgroundColor: "transparent",
    display: "grid",
    grid: "auto / 1fr auto",
    alignItems: "center",
    textAlign: "left",
    width: "100%",
    ":hover": {
      backgroundColor: "#fafafa",
    },
  },
  NormalText,
]);

export const chevron = style({
  transition: "transform 300ms cubic-bezier(0.87, 0, 0.13, 1)",
  selectors: {
    "[data-state=open] &": { transform: "rotate(180deg)" },
  },
});

const slideDown = keyframes({
  from: { height: 0 },
  to: { height: "var(--radix-accordion-content-height)" },
});

const slideUp = keyframes({
  from: { height: "var(--radix-accordion-content-height)" },
  to: { height: 0 },
});

export const content = style({
  selectors: {
    '&[data-state="open"]': {
      animation: `${slideDown} 300ms cubic-bezier(0.87, 0, 0.13, 1)`,
    },
    '&[data-state="closed"]': {
      animation: `${slideUp} 300ms cubic-bezier(0.87, 0, 0.13, 1)`,
    },
  },
});
