import { style } from "@vanilla-extract/css";

export const Colors = {
  black900: "#070807",
  black800: "#0E1111",
  black500: "#3c3d3e",
  black300: "#616263",
  black50: "#c2c3c3",
  white: "#fff",
};

export const FontColors = {
  black900: style({ color: Colors.black900 }),
  black800: style({ color: Colors.black800 }),
  black500: style({ color: Colors.black500 }),
  black300: style({ color: Colors.black300 }),
  black50: style({ color: Colors.black50 }),
};
