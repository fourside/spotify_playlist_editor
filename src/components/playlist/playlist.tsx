import { VFC } from "react";
import { Playlist, Track } from "../../model";
import { Accordion } from "../accordion/accordion";
import { PlaylistIcon } from "../icons";
import { Loader } from "../loader/loader";
import { TrackComponent } from "../track/track";
import { usePlaylistTracks } from "./playlist-hooks";
import { header, headerTitle, loaderContainer, tracksContainer } from "./playlist.css";

type Props = {
  playlist: Playlist;
  onClickInformation: (track: Track) => void;
};

export const PlaylistComponent: VFC<Props> = (props) => {
  const { playlistTracks, error, loading } = usePlaylistTracks(props.playlist.id);

  return (
    <Accordion header={<Header title={props.playlist.name} />} title={props.playlist.name}>
      {loading ? (
        <div className={loaderContainer}>
          <Loader />
        </div>
      ) : error !== undefined ? (
        <div>error: {error.message}</div>
      ) : playlistTracks?.length === 0 ? (
        <div>no tracks</div>
      ) : (
        <div className={tracksContainer}>
          {playlistTracks?.map((track) => (
            <TrackComponent
              key={track.id}
              track={track}
              dragType="playlist-track"
              onClickInformation={props.onClickInformation}
            />
          ))}
        </div>
      )}
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
