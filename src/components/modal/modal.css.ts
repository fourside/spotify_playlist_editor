import { style } from "@vanilla-extract/css";

export const backdrop = style({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1,
  backgroundColor: "#00000080",
});
