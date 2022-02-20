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

export const trackItem = style({
  display: "grid",
  alignItems: "center",
  padding: "8px",
  fontSize: "14px",
  color: "#333",
  position: "relative",
  border: "1px solid transparent",
});

export const trackItemOverTop = style({
  borderTop: "1px solid blue",
});

export const trackItemOverBottom = style({
  borderBottom: "1px solid blue",
});

export const trackDropTopArea = style({
  position: "absolute",
  top: 0,
  height: "50%",
  width: "100%",
  borderTopLeftRadius: "4px",
  borderTopRightRadius: "4px",
  border: "1px solid #ccc",
  borderBottom: "none",
});

export const trackDropBottomArea = style({
  position: "absolute",
  bottom: "0",
  height: "50%",
  width: "100%",
  borderBottomLeftRadius: "4px",
  borderBottomRightRadius: "4px",
  border: "1px solid #ccc",
  borderTop: "none",
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
