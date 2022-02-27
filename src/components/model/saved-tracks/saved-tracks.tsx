import Link from "next/link";
import { VFC } from "react";
import { Track } from "../../../model";
import { HeartIcon } from "../../icons";
import { Loader } from "../../ui/loader/loader";
import { TrackComponent } from "../track/track";
import { useSavedTracks } from "./saved-tracks-hooks";
import { container, title, tracksContainer } from "./saved-tracks.css";

type Props = {
  onTrackInfoClick: (track: Track) => void;
};

export const SavedTracksComponent: VFC<Props> = (props) => {
  const { loading, savedTracks, error } = useSavedTracks();

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
          <p>saved tracks error: {error.message}</p>
          <Link href="/">
            <a>top</a>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={container}>
      <div className={title}>
        <HeartIcon />
        Saved tracks
      </div>
      <div className={tracksContainer}>
        {savedTracks?.map((track) => (
          <TrackComponent
            key={track.id}
            track={track}
            dragType="saved-track"
            onClickInformation={props.onTrackInfoClick}
          />
        ))}
      </div>
    </div>
  );
};
