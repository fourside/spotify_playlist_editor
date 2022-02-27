import Link from "next/link";
import { useCallback, VFC } from "react";
import { Track } from "../../../model";
import { PlusIcon } from "../../icons";
import { Button } from "../../ui/button/button";
import { Loader } from "../../ui/loader/loader";
import { PlaylistComponent } from "../playlist/playlist";
import { useMyPlaylists } from "./playlists-hooks";
import { container, createButton, playlistsContainer, title } from "./playlists.css";

type Props = {
  onTrackInfoClick: (track: Track) => void;
};

export const PlaylistsComponent: VFC<Props> = (props) => {
  const { loading, myPlaylists, error } = useMyPlaylists();

  // TODO
  const handleCreatePlaylistClick = useCallback(() => {}, []);

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
      <Button type="tertiary" onClick={handleCreatePlaylistClick} className={createButton}>
        <PlusIcon />
        Create new playlist
      </Button>
    </div>
  );
};
