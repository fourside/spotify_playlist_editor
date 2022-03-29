import { ComponentProps, FC } from "react";
import { buttons } from "./button.css";

type Props = ComponentProps<"button"> & {
  buttonType: "primary" | "tertiary" | "danger";
  children: React.ReactNode;
};

export const Button: FC<Props> = (props) => {
  return (
    <button
      className={`${buttons[props.buttonType]} ${props.className}`}
      onClick={props.onClick}
      disabled={props.disabled}
      type="button"
    >
      {props.children}
    </button>
  );
};
