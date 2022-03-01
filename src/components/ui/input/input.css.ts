import { style } from "@vanilla-extract/css";
import { NormalText } from "../../../styles/fonts.css";

export const container = style([
  {
    border: "1px solid #ccc",
    borderRadius: "4px",
    padding: "8px",
    width: "100%",
    fontFamily: "inherit",
    ":disabled": {
      opacity: 0.4,
    },
  },
  NormalText,
]);
