import { style } from "@vanilla-extract/css";
import { Colors } from "../../styles/colors.css";
import { LargeTitle, SmallText } from "../../styles/fonts.css";

export const container = style({
  height: "80px",
  display: "grid",
  grid: "auto / 1fr auto",
  alignItems: "center",
  padding: "0 32px",
  backgroundColor: `${Colors.white}`,
});

export const title = style([{}, LargeTitle]);

export const menuItem = style([
  {
    display: "grid",
    grid: "auto / auto 1fr",
    alignItems: "center",
    gap: "4px",
    padding: "4px",
  },
  SmallText,
]);

export const menuItemAnchor = style([
  {
    display: "inline-grid",
    grid: "auto / auto 1fr",
    alignItems: "center",
    gap: "4px",
    color: `${Colors.blue800}`,
    cursor: "pointer",
    padding: "4px",
  },
  SmallText,
]);
