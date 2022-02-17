import { signOut } from "next-auth/react";
import Link from "next/link";
import { useCallback, VFC } from "react";
import { useSpotify } from "./editor-hooks";
import { container, header, tracksContainer, savedTrackItem } from "./editor.css";

export const Editor: VFC = () => {
  const { loading, savedTracks, error } = useSpotify();

  const handleSignOutClick = useCallback(async () => {
    await signOut();
    window.location.href = "/";
  }, []);

  if (error !== undefined) {
    console.error(error);
    return (
      <div>
        <h1>Error</h1>
        <div>
          <p>{error.message}</p>
          <Link href="/">
            <a>top</a>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={container}>
      <h1 className={header}>Editor</h1>
      <button onClick={handleSignOutClick}>SignOut</button>
      {loading ? (
        <div>loading...</div>
      ) : (
        <div className={tracksContainer}>
          {savedTracks?.map((track, index) => (
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
