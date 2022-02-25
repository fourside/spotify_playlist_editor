import { VFC } from "react";
import { Track } from "../../model";
import { NormalTitle } from "../../styles/fonts.css";
import { PopularityBar } from "../popularity-bar/popularity-bar";
import { body, bodyLeft, bodyRight, container, header, label } from "./track-detail.css";

type Props = {
  track: Track;
};

export const TrackDetailComponent: VFC<Props> = (props) => {
  return (
    <div className={container}>
      <div className={`${NormalTitle} ${header}`}>{props.track.name}</div>
      <div className={body}>
        <div className={bodyLeft}>
          <div>{props.track.artistName}</div>
          <div>duration: {props.track.durationMs}</div>
          <div>
            <div className={label}>popularity</div>
            <PopularityBar popularity={props.track.popularity} />
          </div>
        </div>
        <div className={bodyRight}>
          <img src={props.track.albumImageUrl} alt={props.track.artistName} width={"100%"} height={"100%"} />
        </div>
      </div>
    </div>
  );
};
