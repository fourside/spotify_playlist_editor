import { useCallback } from "react";
import useSWRImmutable from "swr/immutable";
import { useSWRConfig } from "swr";
import { addSavedTrack, getSavedTracks } from "../../../lib/client";
import { Track } from "../../../model";

export function useSavedTracks(): {
  savedTracks: Track[] | undefined;
  loading: boolean;
  error: Error | undefined;
  onMove: (track: Track) => Promise<void>;
} {
  const { mutate } = useSWRConfig();
  const { data, error } = useSWRImmutable("saved-tracks", getSavedTracks);

  const onMove = useCallback(
    async (track: Track) => {
      await addSavedTrack(track.id);
      mutate("saved-tracks");
    },
    [mutate]
  );

  return {
    savedTracks: data?.tracks,
    loading: data === undefined && error === undefined,
    error: error,
    onMove,
  };
}
