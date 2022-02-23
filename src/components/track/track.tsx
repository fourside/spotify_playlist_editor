import { VFC } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Track } from "../../model";
import { trackDropBottomArea, trackDropTopArea, trackItem, trackItemOverBottom, trackItemOverTop } from "./track.css";

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
      className={`${trackItem} ${dropTopCollected.isOver && trackItemOverTop} ${
        dropBottomCollected.isOver && trackItemOverBottom
      }`}
      ref={dragRef}
      style={{ opacity: dragCollected.isDragging ? 0.5 : 1 }}
    >
      <div className={trackDropTopArea} ref={dropTopRef} />
      {props.track.name} by {props.track.artistName}
      <div className={trackDropBottomArea} ref={dropBottomRef} />
    </div>
  );
};
