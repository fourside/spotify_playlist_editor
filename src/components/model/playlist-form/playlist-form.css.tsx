import { style } from "@vanilla-extract/css";
import { Colors } from "../../../styles/colors.css";
import { BoldText, NormalText, SmallText } from "../../../styles/fonts.css";

export const container = style({
  padding: "32px",
  display: "grid",
  gap: "8px",
  backgroundColor: Colors.white,
  borderRadius: "12px",
  width: "100%",
});

export const label = style([{}, BoldText]);

export const validationError = style([
  {
    color: Colors.error,
  },
  SmallText,
]);

export const submitError = style([
  {
    color: Colors.error,
  },
  NormalText,
]);
