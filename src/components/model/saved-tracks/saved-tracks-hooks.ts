import { useCallback } from "react";
import useSWRImmutable from "swr/immutable";
import { useSWRConfig } from "swr";
import { addSavedTrack, getSavedTracks, removeTrackFromPlaylist } from "../../../lib/client";
import { Playlist, Track } from "../../../model";

export function useSavedTracks(): {
  savedTracks: Track[] | undefined;
  loading: boolean;
  error: Error | undefined;
  onMove: (track: Track, playlistId: Playlist["id"]) => Promise<void>;
} {
  const { mutate } = useSWRConfig();
  const { data, error } = useSWRImmutable("saved-tracks", getSavedTracks);

  const onMove = useCallback(
    async (track: Track, playlistId: Playlist["id"]) => {
      await addSavedTrack(track.id);
      await removeTrackFromPlaylist(playlistId, track.uri);
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
