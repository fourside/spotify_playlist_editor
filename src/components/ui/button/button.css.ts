import { style, styleVariants } from "@vanilla-extract/css";
import { Colors } from "../../../styles/colors.css";

const base = style([
  {
    all: "unset",
    padding: "8px 16px",
    borderRadius: "4px",
    userSelect: "none",
    fontSize: "14px",
    fontWeight: "normal",
    lineHeight: "130%",
    display: "flex",
    alignItems: "center",
    ":disabled": {
      opacity: 0.6,
    },
  },
]);

export const buttons = styleVariants({
  primary: [
    base,
    {
      backgroundColor: Colors.blue800,
      color: Colors.white,
      ":hover": {
        backgroundColor: Colors.blue600,
      },
      ":focus": {
        boxShadow: "0 0 0 .1rem rgb(33,115,215,.5)", // blue800
      },
    },
  ],
  tertiary: [
    base,
    {
      backgroundColor: Colors.white,
      color: Colors.black300,
      ":hover": {
        backgroundColor: Colors.black20,
      },
      ":focus": {
        boxShadow: "0 0 0 .1rem rgb(97,98,99,.5)", // black300
      },
    },
  ],
  danger: [
    base,
    {
      backgroundColor: Colors.red600,
      color: Colors.white,
      ":hover": {
        backgroundColor: Colors.red300,
      },
      ":focus": {
        boxShadow: "0 0 0 .1rem rgb(208,11,11,.5)", // red600
      },
    },
  ],
});
