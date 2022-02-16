import { signOut } from "next-auth/react";
import { useCallback, VFC } from "react";
import { useSpotify } from "./editor-hooks";
import { container, header, tracksContainer, savedTrackItem } from "./editor.css";

export const Editor: VFC = () => {
  const { loading, savedTracks } = useSpotify();

  const handleSignOutClick = useCallback(async () => {
    await signOut();
    window.location.href = "/";
  }, []);

  return (
    <div className={container}>
      <h1 className={header}>Editor</h1>
      <button onClick={handleSignOutClick}>SignOut</button>
      {loading ? (
        <div>loading...</div>
      ) : (
        <div className={tracksContainer}>
          {savedTracks.map((track, index) => (
            <div key={index} className={savedTrackItem}>
              <div>
                {track.name} by {track.artistName}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
