import { ChangeEvent, useCallback, VFC } from "react";
import { container } from "./input.css";

type Props = {
  value: string | undefined;
  disabled?: boolean;
  placeholder?: string;
  autoFocus?: boolean;
  onChange: (value: string) => void;
};

export const Input: VFC<Props> = (props) => {
  const { onChange } = props;
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value);
    },
    [onChange]
  );

  return (
    <input
      type="text"
      value={props.value}
      onChange={handleChange}
      disabled={props.disabled}
      placeholder={props.placeholder}
      autoFocus={props.autoFocus}
      className={container}
    />
  );
};
