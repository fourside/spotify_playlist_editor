import { VFC } from "react";
import { useDrop } from "react-dnd";
import { CautionIcon } from "../../icons";
import { DragType } from "../track/track";
import { container } from "./empty-track.css";

type Props = {
  dragType: DragType;
};

export const EmptyTrackComponent: VFC<Props> = (props) => {
  const acceptDragType = props.dragType === "playlist-track" ? "saved-track" : "playlist-track";

  const [, dropRef] = useDrop({
    accept: acceptDragType,
    drop: (dropped) => console.log("drop", dropped),
  });

  return (
    <div className={container} ref={dropRef}>
      <CautionIcon />
      No tracks
    </div>
  );
};
