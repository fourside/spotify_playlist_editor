import { useCallback, VFC } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Track, Playlist } from "../../../model";
import { FontColors } from "../../../styles/colors.css";
import { NormalText, SmallText } from "../../../styles/fonts.css";
import { InfoIcon } from "../../icons";
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

type DragObject = { track: Track; playlistId?: Playlist["id"] };

type TrackComponentProps = {
  track: Track;
  dragType: DragType;
  index: number;
  disabled: boolean;
  playlistId: string | undefined;
  onClickInformation: (track: Track) => void;
  onDrop: (track: Track, position: number, playlistId?: string) => void;
};

export const TrackComponent: VFC<TrackComponentProps> = (props) => {
  const { onClickInformation, onDrop } = props;

  const [dragCollected, dragRef] = useDrag<DragObject, void, { isDragging: boolean }>({
    type: props.dragType,
    item: () => ({ track: props.track, playlistId: props.playlistId }),
    canDrag: () => !props.disabled,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const acceptDragType = props.dragType === "playlist-track" ? "saved-track" : "playlist-track";

  const [dropTopCollected, dropTopRef] = useDrop<DragObject, void, { isOver: boolean }>({
    accept: acceptDragType,
    drop: (dropped) => onDrop(dropped.track, props.index, dropped.playlistId),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const [dropBottomCollected, dropBottomRef] = useDrop<DragObject, void, { isOver: boolean }>({
    accept: acceptDragType,
    drop: (dropped) => onDrop(dropped.track, props.index + 1, dropped.playlistId),
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
        <div className={information} onClick={handleInfoClick}>
          <InfoIcon className={informationIcon} />
        </div>
      </div>
      <div className={dropBottomArea} ref={dropBottomRef} />
    </div>
  );
};
