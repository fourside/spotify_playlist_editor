import useSWRImmutable from "swr/immutable";
import { getSavedTracks } from "../../../lib/client";
import { Track } from "../../../model";

export function useSavedTracks(): { savedTracks: Track[] | undefined; loading: boolean; error: Error | undefined } {
  const { data, error } = useSWRImmutable("saved-tracks", getSavedTracks);

  return {
    savedTracks: data?.tracks,
    loading: data === undefined && error === undefined,
    error: error,
  };
}
