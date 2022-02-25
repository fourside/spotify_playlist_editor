import { style } from "@vanilla-extract/css";

export const container = style({
  padding: "8px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  fontSize: "14px",
  color: "#333",
});

export const header = style({
  cursor: "pointer",
});

export const tracksContainer = style({
  padding: "16px",
  overflowY: "scroll",
  maxHeight: "30vh",
});
