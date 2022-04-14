import { VFC } from "react";
import { useDrop } from "react-dnd";
import { Track } from "../../../model";
import { CautionIcon } from "../../ui/icons";
import { DragType } from "../track";
import { container, dropOver } from "./empty-track.css";

type Props = {
  dragType: DragType;
  onDrop: (track: Track, position: number) => void;
};

export const EmptyTrackComponent: VFC<Props> = (props) => {
  const { onDrop } = props;
  const acceptDragType = props.dragType === "playlist-track" ? "saved-track" : "playlist-track";

  const [collected, dropRef] = useDrop<Track, void, { isOver: boolean }>({
    accept: acceptDragType,
    drop: (dropped) => onDrop(dropped, 0),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div className={`${container} ${collected.isOver && dropOver}`} ref={dropRef} role="listitem">
      <CautionIcon />
      No tracks
    </div>
  );
};
