import Link from "next/link";
import { useCallback, useState, VFC } from "react";
import { useMyPlaylists, useSavedTracks } from "./editor-hooks";
import { pageContainer, tracksContainer, editorContainer, playlistContainer } from "./editor.css";
import { Track } from "../../model";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TrackComponent } from "../track/track";
import { TrackDetailComponent } from "../track-detail/track-detail";
import { Modal } from "../modal/modal";
import { HeaderComponent } from "../header/header";
import { useSession } from "next-auth/react";
import { PlaylistComponent } from "../playlist/playlist";
import { Loader } from "../loader/loader";

export const Editor: VFC = () => {
  const { data: session } = useSession();
  const { loading: savedTracksLoading, savedTracks, error: savedTracksError } = useSavedTracks();
  const { loading: myPlaylistsLoading, myPlaylists, error: myPlaylistsError } = useMyPlaylists();
  const [trackDetail, setTrackDetail] = useState<Track>();

  const handleTrackInfoClick = useCallback((track: Track) => {
    setTrackDetail(track);
  }, []);

  const handleTrackDetailModalClose = useCallback(() => {
    setTrackDetail(undefined);
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
      <HeaderComponent userName={session?.user?.name ?? ""} />
      <div className={editorContainer}>
        <DndProvider backend={HTML5Backend}>
          {savedTracksLoading ? (
            <div>
              <Loader />
            </div>
          ) : (
            <div className={tracksContainer}>
              {savedTracks?.map((track) => (
                <TrackComponent
                  key={track.id}
                  track={track}
                  dragType="saved-track"
                  onClickInformation={handleTrackInfoClick}
                />
              ))}
            </div>
          )}
          {myPlaylistsLoading ? (
            <div>
              <Loader />
            </div>
          ) : (
            <div className={playlistContainer}>
              {myPlaylists?.map((playlist) => (
                <PlaylistComponent key={playlist.id} playlist={playlist} onClickInformation={handleTrackInfoClick} />
              ))}
            </div>
          )}
        </DndProvider>
      </div>
      {trackDetail !== undefined && (
        <Modal onOutsideClick={handleTrackDetailModalClose}>
          <TrackDetailComponent track={trackDetail} />
        </Modal>
      )}
    </div>
  );
};
