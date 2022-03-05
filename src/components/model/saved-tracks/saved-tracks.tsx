import Link from "next/link";
import { useCallback, useState, VFC } from "react";
import { Track } from "../../../model";
import { HeartIcon } from "../../icons";
import { Loader } from "../../ui/loader/loader";
import { TrackComponent } from "../track/track";
import { useSavedTracks } from "./saved-tracks-hooks";
import { container, title, tracksContainer } from "./saved-tracks.css";

type Props = {
  onTrackInfoClick: (track: Track) => void;
};

export const SavedTracksComponent: VFC<Props> = (props) => {
  const { loading, savedTracks, error, onAdd, onRemove } = useSavedTracks();
  const [moving, setMoving] = useState(false);

  const handleTrackDrop = useCallback(
    async (droppedTrack: Track, _position: number) => {
      setMoving(true);
      try {
        await onAdd(droppedTrack);
      } catch (error) {
        console.error(error);
      }
      setMoving(false);
    },
    [onAdd]
  );

  const handleTrackDragEnd = useCallback(
    async (track: Track) => {
      setMoving(true);
      try {
        await onRemove(track);
      } catch (error) {
        console.error(error);
      }
      setMoving(false);
    },
    [onRemove]
  );

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }
  if (error !== undefined) {
    console.error(error);
    return (
      <div>
        <h1>Error</h1>
        <div>
          <p>saved tracks error: {error.message}</p>
          <Link href="/">
            <a>top</a>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={container}>
      <div className={title}>
        <HeartIcon />
        Saved tracks
      </div>
      <div className={tracksContainer}>
        {savedTracks?.map((track, index) => (
          <TrackComponent
            key={track.id}
            track={track}
            index={index}
            disabled={moving}
            dragType="saved-track"
            playlistId={undefined}
            onClickInformation={props.onTrackInfoClick}
            onDrop={handleTrackDrop}
            onDragEnd={handleTrackDragEnd}
          />
        ))}
      </div>
    </div>
  );
};
