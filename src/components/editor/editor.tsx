import { signOut } from "next-auth/react";
import Link from "next/link";
import { useCallback, useState, VFC } from "react";
import { useMyPlaylists, useSavedTracks, usePlaylistTracks } from "./editor-hooks";
import {
  pageContainer,
  header,
  tracksContainer,
  trackItem,
  editorContainer,
  playListContainer,
  playlistContainer,
  playlistTracksContainer,
  playListHeader,
  trackDropTopArea,
  trackDropBottomArea,
  trackItemOverTop,
  trackItemOverBottom,
} from "./editor.css";
import { Playlist, Track } from "../../model";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

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
        <DndProvider backend={HTML5Backend}>
          {savedTracksLoading ? (
            <div>loading...</div>
          ) : (
            <div className={tracksContainer}>
              {savedTracks?.map((track) => (
                <TrackComponent key={track.id} track={track} dragType="saved-track" />
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
        </DndProvider>
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
              <TrackComponent key={track.id} track={track} dragType="playlist-track" />
            ))}
          </div>
        )
      ) : null}
    </div>
  );
};

type DragType = "saved-track" | "playlist-track";

type TrackComponentProps = { track: Track; dragType: DragType };

const TrackComponent: VFC<TrackComponentProps> = (props) => {
  const [dragCollected, dragRef] = useDrag({
    type: props.dragType,
    item: () => props.track,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const acceptDragType = props.dragType === "playlist-track" ? "saved-track" : "playlist-track";

  const [dropTopCollected, dropTopRef] = useDrop({
    accept: acceptDragType,
    drop: (dropped) => console.log("drop top!", dropped),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const [dropBottomCollected, dropBottomRef] = useDrop({
    accept: acceptDragType,
    drop: (dropped) => console.log("drop bottom!", dropped),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      className={`${trackItem} ${dropTopCollected.isOver && trackItemOverTop} ${
        dropBottomCollected.isOver && trackItemOverBottom
      }`}
      ref={dragRef}
      style={{ opacity: dragCollected.isDragging ? 0.5 : 1 }}
    >
      <div className={trackDropTopArea} ref={dropTopRef} />
      {props.track.name} by {props.track.artistName}
      <div className={trackDropBottomArea} ref={dropBottomRef} />
    </div>
  );
};
