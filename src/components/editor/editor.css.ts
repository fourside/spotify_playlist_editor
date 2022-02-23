import { style } from "@vanilla-extract/css";

export const pageContainer = style({
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

export const playListContainer = style({
  padding: "8px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  fontSize: "14px",
  color: "#333",
});

export const playListHeader = style({
  cursor: "pointer",
});

export const playlistTracksContainer = style({
  padding: "16px",
  overflowY: "scroll",
  maxHeight: "30vh",
});
