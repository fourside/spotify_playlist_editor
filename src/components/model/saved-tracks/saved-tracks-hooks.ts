import useSWR from "swr";
import { getSavedTracks } from "../../../lib/client";
import { Track } from "../../../model";

export function useSavedTracks(): { savedTracks: Track[] | undefined; loading: boolean; error: Error | undefined } {
  const { data, error } = useSWR("saved-tracks", getSavedTracks);

  return {
    savedTracks: data?.tracks,
    loading: data === undefined && error === undefined,
    error: error,
  };
}
