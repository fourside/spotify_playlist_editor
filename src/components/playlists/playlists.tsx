import Link from "next/link";
import { VFC } from "react";
import { Track } from "../../model";
import { Loader } from "../loader/loader";
import { PlaylistComponent } from "../playlist/playlist";
import { useMyPlaylists } from "./playlists-hooks";
import { container } from "./playlists.css";

type Props = {
  onTrackInfoClick: (track: Track) => void;
};

export const PlaylistsComponent: VFC<Props> = (props) => {
  const { loading, myPlaylists, error } = useMyPlaylists();

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
      {myPlaylists?.map((playlist) => (
        <PlaylistComponent key={playlist.id} playlist={playlist} onClickInformation={props.onTrackInfoClick} />
      ))}
    </div>
  );
};
