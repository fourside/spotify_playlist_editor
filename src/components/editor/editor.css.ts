import { style } from "@vanilla-extract/css";

export const pageContainer = style({
  height: "100vh",
  overflow: "hidden",
});

export const editorContainer = style({
  display: "grid",
  grid: "auto / 50% 50%",
});

export const tracksContainer = style({
  height: "calc(100% - 120px)",
  padding: "16px",
  overflowY: "scroll",
});

export const playlistContainer = style({
  padding: "16px",
  overflowY: "scroll",
});
