import { style } from "@vanilla-extract/css";
import { Colors } from "../../../styles/colors.css";
import { SmallText } from "../../../styles/fonts.css";

export const container = style({
  borderRadius: "8px",
  width: "100%",
  color: `${Colors.white}`,
  backgroundColor: `${Colors.white}`,
});

export const parameter = style([
  {
    borderRadius: "8px",
    background: "linear-gradient(0.25turn, #3f87a6, 80%, #fefefe);",
    height: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  SmallText,
]);
