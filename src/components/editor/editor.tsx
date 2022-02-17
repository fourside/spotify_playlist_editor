import { signOut } from "next-auth/react";
import Link from "next/link";
import { useCallback, VFC } from "react";
import { useMyPlaylists, useSavedTracks } from "./editor-hooks";
import {
  pageContainer,
  header,
  tracksContainer,
  savedTrackItem,
  editorContainer,
  playListItem,
  playlistContainer,
} from "./editor.css";

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
              <div key={track.id} className={savedTrackItem}>
                <div>
                  {track.name} by {track.artistName}
                </div>
              </div>
            ))}
          </div>
        )}
        {myPlaylistsLoading ? (
          <div>loading...</div>
        ) : (
          <div className={playlistContainer}>
            {myPlaylists?.map((playlist) => (
              <div key={playlist.id} className={playListItem}>
                <div>{playlist.name}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
