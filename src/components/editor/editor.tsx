import { signOut } from "next-auth/react";
import Link from "next/link";
import { useCallback, useState, VFC } from "react";
import { useMyPlaylists, useSavedTracks, usePlaylistTracks } from "./editor-hooks";
import {
  pageContainer,
  header,
  tracksContainer,
  savedTrackItem,
  editorContainer,
  playListContainer,
  playlistContainer,
  playlistTracksContainer,
  playListHeader,
} from "./editor.css";
import { Playlist, Track } from "../../model";

export const Editor: VFC = () => {
  const { loading: savedTracksLoading, savedTracks, error: savedTracksError } = useSavedTracks();
  const { loading: myPlaylistsLoading, myPlaylists, error: myPlaylistsError } = useMyPlaylists();

  const handleSignOutClick = useCallback(async () => {
    await signOut();
    window.location.href = "/";
  }, []);

  if (savedTracksError !== undefined) {
    console.error(savedTracksError);
    return (
      <div>
        <h1>Error</h1>
        <div>
          <p>saved tracks error: {savedTracksError.message}</p>
          <Link href="/">
            <a>top</a>
          </Link>
        </div>
      </div>
    );
  }

  if (myPlaylistsError !== undefined) {
    console.error(myPlaylistsError);
    return (
      <div>
        <h1>Error</h1>
        <div>
          <p>my playlists error: {myPlaylistsError.message}</p>
          <Link href="/">
            <a>top</a>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={pageContainer}>
      <h1 className={header}>Editor</h1>
      <button onClick={handleSignOutClick}>SignOut</button>
      <div className={editorContainer}>
        {savedTracksLoading ? (
          <div>loading...</div>
        ) : (
          <div className={tracksContainer}>
            {savedTracks?.map((track) => (
              <TrackComponent key={track.id} track={track} />
            ))}
          </div>
        )}
        {myPlaylistsLoading ? (
          <div>loading...</div>
        ) : (
          <div className={playlistContainer}>
            {myPlaylists?.map((playlist) => (
              <PlaylistComponent key={playlist.id} playlist={playlist} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

type PlaylistComponentProps = {
  playlist: Playlist;
};

const PlaylistComponent: VFC<PlaylistComponentProps> = (props) => {
  const { playlistTracks, error, loading } = usePlaylistTracks(props.playlist.id);
  const [open, setOpen] = useState(false);

  const handleOpenClick = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  return (
    <div className={playListContainer}>
      <div className={playListHeader} onClick={handleOpenClick}>
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
          <div className={playlistTracksContainer}>
            {playlistTracks?.map((track) => (
              <TrackComponent key={track.id} track={track} />
            ))}
          </div>
        )
      ) : null}
    </div>
  );
};

type TrackComponentProps = { track: Track };

const TrackComponent: VFC<TrackComponentProps> = (props) => {
  return (
    <div className={savedTrackItem}>
      {props.track.name} by {props.track.artistName}
    </div>
  );
};
