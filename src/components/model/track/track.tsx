import { useCallback, FC } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Track } from "../../../model";
import { FontColors } from "../../../styles/colors.css";
import { NormalText, SmallText } from "../../../styles/fonts.css";
import { InfoIcon } from "../../ui/icons";
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

export type DragType = "saved-track" | "playlist-track";

type TrackComponentProps = {
  track: Track;
  dragType: DragType;
  index: number;
  disabled: boolean;
  onClickInformation: (track: Track) => void;
  onDrop: (track: Track, position: number) => void;
  onDragEnd: (track: Track) => void;
};

export const TrackComponent: FC<TrackComponentProps> = (props) => {
  const { onClickInformation, onDrop, onDragEnd } = props;

  const [dragCollected, dragRef] = useDrag({
    type: props.dragType,
    item: () => props.track,
    canDrag: () => !props.disabled,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (track, monitor) => {
      if (monitor.didDrop()) {
        onDragEnd(track);
      }
    },
  });

  const acceptDragType = props.dragType === "playlist-track" ? "saved-track" : "playlist-track";

  const [dropTopCollected, dropTopRef] = useDrop<Track, void, { isOver: boolean }>({
    accept: acceptDragType,
    drop: (dropped) => onDrop(dropped, props.index),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const [dropBottomCollected, dropBottomRef] = useDrop<Track, void, { isOver: boolean }>({
    accept: acceptDragType,
    drop: (dropped) => onDrop(dropped, props.index + 1),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const handleInfoClick = useCallback(() => {
    onClickInformation(props.track);
  }, [onClickInformation, props.track]);

  return (
    <div
      className={`${container}
       ${dragCollected.isDragging && dragging}
       ${dropTopCollected.isOver && overTop} ${dropBottomCollected.isOver && overBottom} `}
      ref={dragRef}
      role="listitem"
    >
      <div className={dropTopArea} ref={dropTopRef} />
      <div className={innerContainer}>
        <div className={dragHandleContainer}>
          <span className={dragHandle} />
        </div>
        <div className={trackName}>
          <div className={NormalText}>{props.track.name}</div>
          <div className={`${SmallText} ${FontColors.black500}`}>{props.track.artistName}</div>
        </div>
        <button className={information} onClick={handleInfoClick}>
          <InfoIcon className={informationIcon} />
        </button>
      </div>
      <div className={dropBottomArea} ref={dropBottomRef} />
    </div>
  );
};
