import { style } from "@vanilla-extract/css";

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
