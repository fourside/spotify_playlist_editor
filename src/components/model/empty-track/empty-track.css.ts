import { style } from "@vanilla-extract/css";
import { NormalText } from "../../../styles/fonts.css";

export const container = style([
  {
    display: "grid",
    grid: "auto / auto 1fr",
    alignItems: "center",
    gap: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    padding: "8px",
  },
  NormalText,
]);
