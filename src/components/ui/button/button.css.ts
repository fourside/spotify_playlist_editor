import { style } from "@vanilla-extract/css";
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

export const primary = style([
  base,
  {
    backgroundColor: Colors.blue800,
    color: Colors.white,
    ":hover": {
      backgroundColor: Colors.blue600,
    },
  },
]);

export const tertiary = style([
  base,
  {
    backgroundColor: Colors.white,
    color: Colors.black300,
    ":hover": {
      backgroundColor: Colors.black20,
    },
  },
]);

export const danger = style([
  base,
  {
    backgroundColor: Colors.red600,
    color: Colors.white,
    ":hover": {
      backgroundColor: Colors.red300,
    },
  },
]);
