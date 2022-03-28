import Link from "next/link";
import { useCallback, useState, VFC } from "react";
import { Track } from "../../../model";
import { PlusIcon } from "../../ui/icons";
import { Button } from "../../ui/button";
import { Loader } from "../../ui/loader";
import { Modal } from "../../ui/modal";
import { PlaylistForm } from "../playlist-form";
import { PlaylistComponent } from "../playlist";
import { useMyPlaylists } from "./playlists-hooks";
import { container, createButton, footer, modalContainer, playlistsContainer, title } from "./playlists.css";

type Props = {
  onTrackInfoClick: (track: Track) => void;
};

export const PlaylistsComponent: VFC<Props> = (props) => {
  const { loading, myPlaylists, error, onCreatePlaylist } = useMyPlaylists();

  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleCreatePlaylistClick = useCallback(() => {
    setOpen(true);
  }, []);

  const handleCreatePlaylistSubmit = useCallback(
    async (playlistName: string) => {
      setSubmitting(true);
      await onCreatePlaylist(playlistName);
      setSubmitting(false);
      setOpen(false);
    },
    [onCreatePlaylist]
  );

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (error !== undefined) {
    console.error(error);
    return (
      <div>
        <h1>Error</h1>
        <div>
          <p>my playlists error: {error.message}</p>
          <Link href="/">
            <a>top</a>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={container}>
      <div className={title}>Playlists</div>
      <div className={playlistsContainer}>
        {myPlaylists?.map((playlist) => (
          <PlaylistComponent key={playlist.id} playlist={playlist} onClickInformation={props.onTrackInfoClick} />
        ))}
      </div>
      <div className={footer}>
        <Button buttonType="tertiary" onClick={handleCreatePlaylistClick} className={createButton}>
          <PlusIcon />
          Create new playlist
        </Button>
      </div>
      {open && (
        <Modal open onClose={handleClose}>
          <div className={modalContainer}>
            <PlaylistForm onSubmit={handleCreatePlaylistSubmit} submitting={submitting} />
          </div>
        </Modal>
      )}
    </div>
  );
};
