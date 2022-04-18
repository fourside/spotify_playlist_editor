import { ChangeEvent, ComponentProps, useCallback, FC } from "react";
import { container } from "./input.css";

type Props = Omit<ComponentProps<"input">, "className" | "onChange"> & {
  onChange: (value: string) => void;
};

export const Input: FC<Props> = (props) => {
  const { onChange } = props;
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value);
    },
    [onChange]
  );

  return <input {...props} type="text" onChange={handleChange} className={container} />;
};
