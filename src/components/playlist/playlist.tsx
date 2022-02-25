import { useCallback, useState, VFC } from "react";
import { Playlist, Track } from "../../model";
import { TrackComponent } from "../track/track";
import { usePlaylistTracks } from "./playlist-hooks";
import { container, header, tracksContainer } from "./playlist.css";

type Props = {
  playlist: Playlist;
  onClickInformation: (track: Track) => void;
};

export const PlaylistComponent: VFC<Props> = (props) => {
  const { playlistTracks, error, loading } = usePlaylistTracks(props.playlist.id);
  const [open, setOpen] = useState(false);

  const handleOpenClick = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  return (
    <div className={container}>
      <div className={header} onClick={handleOpenClick}>
        {props.playlist.name}
      </div>
      {open ? (
        loading ? (
          <>loading...</>
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
        )
      ) : null}
    </div>
  );
};
