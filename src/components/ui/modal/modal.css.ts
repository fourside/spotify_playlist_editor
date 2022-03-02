import { style } from "@vanilla-extract/css";

export const backdrop = style({
  position: "fixed",
  inset: 0,
  width: "100vw",
  height: "100vh",
  zIndex: 1,
  backgroundColor: "#00000080",
});

export const content = style({
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxHeight: "85vh",
  zIndex: 2,
  boxShadow: "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
});

export const closeIcon = style({
  position: "absolute",
  right: 0,
  padding: "8px",
  background: "transparent",
  border: "none",
  cursor: "pointer",
});
