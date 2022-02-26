import Link from "next/link";
import { VFC } from "react";
import { Track } from "../../model";
import { Loader } from "../loader/loader";
import { TrackComponent } from "../track/track";
import { useSavedTracks } from "./saved-tracks-hooks";
import { container } from "./saved-tracks.css";

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
      {savedTracks?.map((track) => (
        <TrackComponent
          key={track.id}
          track={track}
          dragType="saved-track"
          onClickInformation={props.onTrackInfoClick}
        />
      ))}
    </div>
  );
};
