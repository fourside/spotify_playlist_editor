import { style } from "@vanilla-extract/css";
import { SmallTitle } from "../../../styles/fonts.css";

export const container = style({
  padding: "16px",
});

export const title = style([
  {
    padding: "4px 0",
    display: "grid",
    grid: "auto / auto 1fr",
    gap: "4px",
    alignItems: "center",
  },
  SmallTitle,
]);

export const tracksContainer = style({
  height: "calc(100vh - 160px)",
  padding: "0 4px",
  overflowY: "scroll",
});
