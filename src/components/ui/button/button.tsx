import { FC } from "react";
import { danger, primary, tertiary } from "./button.css";

type Props = {
  type: "primary" | "tertiary" | "danger";
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  onClick: () => void;
};

export const Button: FC<Props> = (props) => {
  const buttonClass = props.type === "primary" ? primary : props.type === "tertiary" ? tertiary : danger;
  return (
    <button className={`${buttonClass} ${props.className}`} onClick={props.onClick} disabled={props.disabled}>
      {props.children}
    </button>
  );
};
