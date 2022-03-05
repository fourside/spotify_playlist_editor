import { useCallback } from "react";
import useSWRImmutable from "swr/immutable";
import { useSWRConfig } from "swr";
import { addSavedTrack, getSavedTracks, removeSavedTrack } from "../../../lib/client";
import { Track } from "../../../model";

export function useSavedTracks(): {
  savedTracks: Track[] | undefined;
  loading: boolean;
  error: Error | undefined;
  onAdd: (track: Track) => Promise<void>;
  onRemove: (track: Track) => Promise<void>;
} {
  const { mutate } = useSWRConfig();
  const { data, error } = useSWRImmutable("saved-tracks", getSavedTracks);

  const onAdd = useCallback(
    async (track: Track) => {
      await addSavedTrack(track.id);
      mutate("saved-tracks");
    },
    [mutate]
  );

  const onRemove = useCallback(
    async (track: Track) => {
      await removeSavedTrack(track.id);
      mutate("saved-tracks");
    },
    [mutate]
  );

  return {
    savedTracks: data?.tracks,
    loading: data === undefined && error === undefined,
    error: error,
    onAdd,
    onRemove,
  };
}
