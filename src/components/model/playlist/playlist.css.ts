import { style } from "@vanilla-extract/css";
import { SmallText } from "../../../styles/fonts.css";

export const header = style({
  display: "grid",
  grid: "auto / auto 1fr",
  alignItems: "center",
  gap: "8px",
});

export const headerTitle = style([
  {
    fontFamily: "inherit",
  },
  SmallText,
]);

export const tracksContainer = style({
  padding: "16px",
  overflowY: "scroll",
  maxHeight: "30vh",
});

export const loaderContainer = style({
  display: "flex",
  justifyContent: "center",
  padding: "8px",
});
