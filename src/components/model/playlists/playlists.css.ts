import { style } from "@vanilla-extract/css";
import { SmallTitle } from "../../../styles/fonts.css";

export const container = style({
  padding: "16px",
  overflowY: "scroll",
});

export const playlistsContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: "4px",
});

export const title = style([
  {
    padding: "4px 0",
  },
  SmallTitle,
]);

export const footer = style({
  margin: "8px 0",
});

export const createButton = style({
  display: "grid",
  grid: "auto / auto 1fr",
  alignItems: "center",
  gap: "8px",
});

export const modalContainer = style({
  width: "400px",
});
