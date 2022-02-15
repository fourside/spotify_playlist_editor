import { style } from "@vanilla-extract/css";

export const editorContainer = style({
  height: "100vh",
  overflow: "hidden",
});

export const header = style({
  display: "flex",
  alignItems: "center",
  height: "80px",
  margin: 0,
  paddingLeft: "16px",
});

export const savedTracksContainer = style({
  width: "50%",
  height: "calc(100% - 80px)",
  padding: "16px",
  overflowY: "scroll",
});

export const savedTracksItem = style({
  display: "grid",
  padding: "8px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  fontSize: "14px",
  color: "#333",
});
