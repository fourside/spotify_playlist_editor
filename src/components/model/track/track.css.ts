import { style } from "@vanilla-extract/css";

export const container = style({
  position: "relative",
  border: "1px solid transparent",
  opacity: 1,
});

export const overTop = style({
  borderTop: "1px solid blue",
});

export const overBottom = style({
  borderBottom: "1px solid blue",
});

export const dragging = style({
  opacity: 0.5,
});

export const dropTopArea = style({
  position: "absolute",
  top: 0,
  height: "50%",
  width: "100%",
  borderTopLeftRadius: "4px",
  borderTopRightRadius: "4px",
  border: "1px solid #ccc",
  borderBottom: "none",
});

export const dropBottomArea = style({
  position: "absolute",
  bottom: 0,
  height: "50%",
  width: "100%",
  borderBottomLeftRadius: "4px",
  borderBottomRightRadius: "4px",
  border: "1px solid #ccc",
  borderTop: "none",
});

export const innerContainer = style({
  display: "grid",
  grid: "auto / 16px 1fr auto",
  gap: "8px",
});

export const dragHandleContainer = style({
  padding: "8px",
});

export const dragHandle = style({
  cursor: "grab",
  display: "block",
  width: "8px",
  height: "100%",
  border: "1px solid #ccc",
  borderRadius: "2px",
  position: "relative",
  zIndex: 1,
});

export const trackName = style({
  display: "grid",
  grid: "auto auto / auto",
  gap: "4px",
  padding: "8px",
});

export const information = style({
  all: "unset",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  width: "32px",
});

export const informationIcon = style({
  width: "20px",
  height: "20px",
  cursor: "pointer",
  zIndex: 1,
});
