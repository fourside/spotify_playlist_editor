import { useCallback, useState, FC } from "react";
import { Playlist, Track } from "../../../model";
import { Accordion } from "../../ui/accordion";
import { PlaylistIcon } from "../../ui/icons";
import { Loader } from "../../ui/loader";
import { TrackComponent } from "../track";
import { usePlaylistTracks } from "./playlist-hooks";
import { header, headerTitle, loaderContainer, tracksContainer } from "./playlist.css";
import { EmptyTrackComponent } from "../empty-track";

type Props = {
  playlist: Playlist;
  onClickInformation: (track: Track) => void;
};

export const PlaylistComponent: FC<Props> = (props) => {
  const { playlistTracks, error, loading, onAdd, onRemove } = usePlaylistTracks(props.playlist.id);
  const [moving, setMoving] = useState(false);

  const handleTrackDrop = useCallback(
    async (droppedTrack: Track, position: number) => {
      setMoving(true);
      try {
        await onAdd(droppedTrack, position);
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

  return (
    <Accordion header={<Header title={props.playlist.name} />} title={props.playlist.name}>
      <div className={tracksContainer}>
        {loading ? (
          <div className={loaderContainer}>
            <Loader />
          </div>
        ) : error !== undefined ? (
          <div>error: {error.message}</div>
        ) : playlistTracks?.length === 0 ? (
          <EmptyTrackComponent dragType="playlist-track" onDrop={handleTrackDrop} />
        ) : (
          <div role="list">
            {playlistTracks?.map((track, index) => (
              <TrackComponent
                key={track.id}
                track={track}
                index={index}
                disabled={moving}
                dragType="playlist-track"
                onClickInformation={props.onClickInformation}
                onDrop={handleTrackDrop}
                onDragEnd={handleTrackDragEnd}
              />
            ))}
          </div>
        )}
      </div>
    </Accordion>
  );
};

type HeaderProps = {
  title: string;
};

const Header: FC<HeaderProps> = (props) => {
  return (
    <div className={header}>
      <PlaylistIcon />
      <span className={headerTitle}>{props.title}</span>
    </div>
  );
};
