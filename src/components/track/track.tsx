import { VFC } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Track } from "../../model";
import { Colors } from "../../styles/colors.css";
import { NormalText, SmallText } from "../../styles/fonts.css";
import { InfoIcon } from "../icons";
import {
  dropBottomArea,
  dropTopArea,
  container,
  overBottom,
  overTop,
  innerContainer,
  dragHandle,
  dragHandleContainer,
  trackName,
  dragging,
  information,
  informationIcon,
} from "./track.css";

type DragType = "saved-track" | "playlist-track";

type TrackComponentProps = { track: Track; dragType: DragType };

export const TrackComponent: VFC<TrackComponentProps> = (props) => {
  const [dragCollected, dragRef] = useDrag({
    type: props.dragType,
    item: () => props.track,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const acceptDragType = props.dragType === "playlist-track" ? "saved-track" : "playlist-track";

  const [dropTopCollected, dropTopRef] = useDrop({
    accept: acceptDragType,
    drop: (dropped) => console.log("drop top!", dropped),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const [dropBottomCollected, dropBottomRef] = useDrop({
    accept: acceptDragType,
    drop: (dropped) => console.log("drop bottom!", dropped),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      className={`${container}
       ${dragCollected.isDragging && dragging}
       ${dropTopCollected.isOver && overTop} ${dropBottomCollected.isOver && overBottom} `}
      ref={dragRef}
    >
      <div className={dropTopArea} ref={dropTopRef} />
      <div className={innerContainer}>
        <div className={dragHandleContainer}>
          <span className={dragHandle} />
        </div>
        <div className={trackName}>
          <div className={NormalText}>{props.track.name}</div>
          <div className={`${SmallText} ${Colors.black500}`}>{props.track.artistName}</div>
        </div>
        <div className={information}>
          <InfoIcon className={informationIcon} />
        </div>
      </div>
      <div className={dropBottomArea} ref={dropBottomRef} />
    </div>
  );
};
