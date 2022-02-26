import { style } from "@vanilla-extract/css";
import { Colors } from "../../../styles/colors.css";
import { NormalText, NormalTitle } from "../../../styles/fonts.css";

export const container = style({
  width: "500px",
  backgroundColor: Colors.white,
  borderRadius: "12px",
  color: Colors.black800,
});

export const header = style([
  {
    padding: "32px 32px 16px 32px",
  },
  NormalTitle,
]);

export const body = style({
  padding: "8px 32px 32px 32px",
  display: "grid",
  grid: "auto / 50% 50%",
  gap: "8px",
});

export const bodyLeft = style({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
});

export const bodyRight = style({});

export const label = style([
  {
    padding: "8px 0",
  },
  NormalText,
]);
