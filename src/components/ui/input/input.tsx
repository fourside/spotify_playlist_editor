import { ChangeEvent, ComponentProps, useCallback, VFC } from "react";
import { container } from "./input.css";

type Props = Omit<ComponentProps<"input">, "className"> & {
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

  return <input {...props} type="text" onChange={handleChange} className={container} />;
};
