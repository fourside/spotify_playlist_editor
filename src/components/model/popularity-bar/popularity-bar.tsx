import { FC } from "react";
import { Track } from "../../../model";
import { container, parameter } from "./popularity-bar.css";

type Props = {
  popularity: Track["popularity"];
};

export const PopularityBar: FC<Props> = (props) => {
  return (
    <div className={container}>
      <div className={parameter} style={{ width: `${props.popularity}%` }}>
        {props.popularity}
      </div>
    </div>
  );
};
