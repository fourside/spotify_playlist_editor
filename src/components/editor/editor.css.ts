import { style } from "@vanilla-extract/css";

export const pageContainer = style({
  height: "100vh",
  overflow: "hidden",
});

export const editorContainer = style({
  display: "grid",
  grid: "auto / 50% 50%",
});
