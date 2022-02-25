import Link from "next/link";
import { useCallback, useState, VFC } from "react";
import { useMyPlaylists, useSavedTracks, usePlaylistTracks } from "./editor-hooks";
import {
  pageContainer,
  tracksContainer,
  editorContainer,
  playListContainer,
  playlistContainer,
  playlistTracksContainer,
  playListHeader,
} from "./editor.css";
import { Playlist, Track } from "../../model";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TrackComponent } from "../track/track";
import { TrackDetailComponent } from "../track-detail/track-detail";
import { Modal } from "../modal/modal";
import { HeaderComponent } from "../header/header";
import { useSession } from "next-auth/react";

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
            <div>loading...</div>
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
            <div>loading...</div>
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

type PlaylistComponentProps = {
  playlist: Playlist;
  onClickInformation: (track: Track) => void;
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
