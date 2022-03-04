import { useCallback, useState, VFC } from "react";
import { Playlist, Track } from "../../../model";
import { Accordion } from "../../ui/accordion/accordion";
import { PlaylistIcon } from "../../icons";
import { Loader } from "../../ui/loader/loader";
import { TrackComponent } from "../track/track";
import { usePlaylistTracks } from "./playlist-hooks";
import { header, headerTitle, loaderContainer, tracksContainer } from "./playlist.css";
import { EmptyTrackComponent } from "../empty-track/empty-track";

type Props = {
  playlist: Playlist;
  onClickInformation: (track: Track) => void;
};

export const PlaylistComponent: VFC<Props> = (props) => {
  const { playlistTracks, error, loading, onAddTrack } = usePlaylistTracks(props.playlist.id);
  const [adding, setAdding] = useState(false);

  const handleTrackDrop = useCallback(
    async (droppedTrack: Track, position: number) => {
      setAdding(true);
      try {
        await onAddTrack(droppedTrack.uri, position);
      } catch (error) {
        console.error(error);
      }
      setAdding(false);
    },
    [onAddTrack]
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
          <EmptyTrackComponent dragType="playlist-track" />
        ) : (
          playlistTracks?.map((track, index) => (
            <TrackComponent
              key={track.id}
              track={track}
              index={index}
              disabled={adding}
              dragType="playlist-track"
              onClickInformation={props.onClickInformation}
              onDrop={handleTrackDrop}
            />
          ))
        )}
      </div>
    </Accordion>
  );
};

type HeaderProps = {
  title: string;
};

const Header: VFC<HeaderProps> = (props) => {
  return (
    <div className={header}>
      <PlaylistIcon />
      <span className={headerTitle}>{props.title}</span>
    </div>
  );
};
