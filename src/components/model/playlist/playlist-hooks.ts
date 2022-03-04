import { useCallback } from "react";
import { useSWRConfig } from "swr";
import useSWRImmutable from "swr/immutable";
import { addTrackToPlaylist, getPlaylistTracks, removeSavedTrack } from "../../../lib/client";
import { Track } from "../../../model";

export function usePlaylistTracks(playlistId: string): {
  playlistTracks: Track[] | undefined;
  loading: boolean;
  error: Error | undefined;
  onMove: (track: Track, position: number) => Promise<void>;
} {
  const { mutate } = useSWRConfig();
  const { data, error } = useSWRImmutable(`playlists/${playlistId}`, () => getPlaylistTracks(playlistId));
  const onMove = useCallback(
    async (track: Track, position: number) => {
      await addTrackToPlaylist(playlistId, track.uri, position);
      await removeSavedTrack(track.id);
      mutate(`playlists/${playlistId}`);
    },
    [mutate, playlistId]
  );

  return {
    playlistTracks: data?.tracks,
    loading: data === undefined && error === undefined,
    error: error,
    onMove,
  };
}
