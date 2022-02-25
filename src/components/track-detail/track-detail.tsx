import { VFC } from "react";
import { msToTime } from "../../lib/date-format";
import { Track } from "../../model";
import { NormalText, SmallTitle } from "../../styles/fonts.css";
import { PopularityBar } from "../popularity-bar/popularity-bar";
import { body, bodyLeft, bodyRight, container, header, label } from "./track-detail.css";

type Props = {
  track: Track;
};

export const TrackDetailComponent: VFC<Props> = (props) => {
  return (
    <div className={container}>
      <div className={header}>{props.track.name}</div>
      <div className={body}>
        <div className={bodyLeft}>
          <div className={SmallTitle}>{props.track.artistName}</div>
          <div>
            <div className={label}>duration</div>
            <div className={NormalText}>{msToTime(props.track.durationMs)}</div>
          </div>
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
