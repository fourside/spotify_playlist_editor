import { FC } from "react";
import { buttons } from "./button.css";

type Props = {
  type: "primary" | "tertiary" | "danger";
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  onClick: () => void;
};

export const Button: FC<Props> = (props) => (
  <button className={`${buttons[props.type]} ${props.className}`} onClick={props.onClick} disabled={props.disabled}>
    {props.children}
  </button>
);
