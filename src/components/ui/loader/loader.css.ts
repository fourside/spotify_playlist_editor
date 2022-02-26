import { keyframes, style } from "@vanilla-extract/css";
import { Colors } from "../../../styles/colors.css";

const spin = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
});

export const loader = style({
  width: "24px",
  height: "24px",
  borderRadius: "50%",
  border: `3px solid ${Colors.blue800}`,
  borderTopColor: "transparent",
  opacity: 0.3,
  animation: `${spin} .5s linear infinite`,
});
